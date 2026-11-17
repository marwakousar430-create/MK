import { BagItem, ConfirmedOrder } from '../components/CartDrawer';
import { AgeBracket, GenderFilter, JACKETS, JacketProduct, SizeOption } from '../data/jackets';
import { getStoreSessionId, supabase } from '../lib/supabase';

interface DbJacketSizeRow {
  size_label: string;
  age_range: string;
  min_age: number;
  max_age: number;
  min_height_cm: number;
  max_height_cm: number;
  chest_cm: string;
  length_cm: string;
  bracket: string;
}

interface DbJacketRow {
  id: string;
  sku: string;
  name: string;
  category: string;
  age_span_label: string;
  price: number | string;
  color_name: string;
  color_hex: string;
  weather_rating: string;
  crest_detail: string;
  short_tag: string;
  description: string;
  fabric_specs?: string[] | null;
  image_url: string;
  jacket_sizes?: DbJacketSizeRow[] | null;
}

export async function fetchJacketsFromSupabase(): Promise<JacketProduct[]> {
  if (!supabase) return JACKETS;

  try {
    const { data, error } = await supabase
      .from('jackets')
      .select('*, jacket_sizes(*)')
      .order('sku', { ascending: true });

    if (error || !data || data.length === 0) {
      return JACKETS;
    }

    const mapped: JacketProduct[] = (data as DbJacketRow[]).map((row) => {
      const localFallback = JACKETS.find((j) => j.id === row.id);
      const sizes: SizeOption[] =
        row.jacket_sizes && row.jacket_sizes.length > 0
          ? row.jacket_sizes.map((s) => ({
              label: s.size_label,
              ageRange: s.age_range,
              minAge: s.min_age,
              maxAge: s.max_age,
              minHeightCm: s.min_height_cm,
              maxHeightCm: s.max_height_cm,
              chestCm: s.chest_cm,
              lengthCm: s.length_cm,
              bracket: s.bracket as Exclude<AgeBracket, 'All Ages'>,
            }))
          : localFallback?.sizes ?? [];

      const uniqueBrackets = Array.from(
        new Set(sizes.map((s) => s.bracket)),
      ) as Exclude<AgeBracket, 'All Ages'>[];

      return {
        id: row.id,
        sku: row.sku,
        name: row.name,
        category: (row.category as Exclude<GenderFilter, 'All'>) || 'Unisex',
        ageSpanLabel: row.age_span_label,
        brackets: uniqueBrackets.length > 0 ? uniqueBrackets : localFallback?.brackets ?? [],
        price: Number(row.price),
        colorName: row.color_name,
        colorHex: row.color_hex,
        weatherRating: row.weather_rating,
        crestDetail: row.crest_detail,
        shortTag: row.short_tag,
        description: row.description,
        fabricSpecs:
          row.fabric_specs && row.fabric_specs.length > 0
            ? row.fabric_specs
            : localFallback?.fabricSpecs ?? [],
        image: localFallback?.image ?? row.image_url,
        sizes,
      };
    });

    return mapped;
  } catch {
    return JACKETS;
  }
}

export async function fetchSavedFavoritesFromSupabase(): Promise<string[] | null> {
  if (!supabase) return null;

  try {
    const sessionId = getStoreSessionId();
    const { data, error } = await supabase
      .from('saved_favorites')
      .select('jacket_id')
      .eq('session_id', sessionId);

    if (error || !data) return null;
    return data.map((row) => row.jacket_id as string);
  } catch {
    return null;
  }
}

export async function syncSavedFavoriteToSupabase(
  jacketId: string,
  shouldSave: boolean,
): Promise<void> {
  if (!supabase) return;

  try {
    const sessionId = getStoreSessionId();
    if (shouldSave) {
      await supabase
        .from('saved_favorites')
        .upsert({ session_id: sessionId, jacket_id: jacketId }, { onConflict: 'session_id,jacket_id' });
    } else {
      await supabase
        .from('saved_favorites')
        .delete()
        .eq('session_id', sessionId)
        .eq('jacket_id', jacketId);
    }
  } catch {
    // Local favorites remain intact if Supabase tables are not initialized yet
  }
}

export interface SubmitOrderPayload {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: 'Card' | 'Cash on Delivery';
  shippingSpeed: 'Standard' | 'Express';
  giftNote: string;
  shippingFee: number;
  total: number;
  items: BagItem[];
}

export async function submitOrderToSupabase(
  payload: SubmitOrderPayload,
): Promise<ConfirmedOrder> {
  const totalUnits = payload.items.reduce((sum, item) => sum + item.quantity, 0);
  const confirmed: ConfirmedOrder = {
    orderNumber: payload.orderNumber,
    customerName: payload.customerName,
    phone: payload.phone,
    address: payload.address,
    postalCode: payload.postalCode,
    paymentMethod: payload.paymentMethod,
    shippingSpeed: payload.shippingSpeed,
    giftNote: payload.giftNote,
    total: payload.total,
    itemCount: totalUnits,
    createdAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };

  if (!supabase) return confirmed;

  try {
    const { data: insertedOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: payload.orderNumber,
        customer_name: payload.customerName,
        phone: payload.phone,
        street_address: payload.address,
        postal_code: payload.postalCode,
        payment_method: payload.paymentMethod,
        shipping_speed: payload.shippingSpeed,
        gift_note: payload.giftNote || null,
        shipping_fee: payload.shippingFee,
        total_amount: payload.total,
        status: 'Preparing Shipment',
      })
      .select('id')
      .single();

    if (!orderError && insertedOrder?.id) {
      const lineItems = payload.items.map((item) => ({
        order_id: insertedOrder.id,
        jacket_id: item.jacket.id,
        size_label: item.size.label,
        quantity: item.quantity,
        unit_price: item.jacket.price,
      }));

      await supabase.from('order_items').insert(lineItems);
    }
  } catch (err) {
    console.warn('Supabase order sync skipped (verify tables and RLS policies):', err);
  }

  return confirmed;
}
