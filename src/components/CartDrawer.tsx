import { CheckCircle2, Minus, PackageCheck, Plus, Trash2, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { JacketProduct, SizeOption } from '../data/jackets';
import { SafeImage } from './SafeImage';

export interface BagItem {
  jacket: JacketProduct;
  size: SizeOption;
  quantity: number;
}

export interface ConfirmedOrder {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  paymentMethod: 'Card' | 'Cash on Delivery';
  shippingSpeed: 'Standard' | 'Express';
  giftNote: string;
  total: number;
  itemCount: number;
  createdAt: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: BagItem[];
  lastOrder: ConfirmedOrder | null;
  onClose: () => void;
  onUpdateQty: (jacketId: string, sizeLabel: string, delta: number) => void;
  onRemoveItem: (jacketId: string, sizeLabel: string) => void;
  onSubmitOrder: (payload: {
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
  }) => Promise<ConfirmedOrder>;
}

const FREE_SHIPPING_THRESHOLD = 150;

export function CartDrawer({
  isOpen,
  items,
  lastOrder,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onSubmitOrder,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Cash on Delivery'>('Cash on Delivery');
  const [shippingSpeed, setShippingSpeed] = useState<'Standard' | 'Express'>('Standard');
  const [giftNote, setGiftNote] = useState('');
  const [activeOrder, setActiveOrder] = useState<ConfirmedOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.jacket.price * item.quantity, 0);
  const standardFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12;
  const shippingFee = shippingSpeed === 'Express' ? 18 : standardFee;
  const total = subtotal + shippingFee;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const randomNum = Math.floor(1040 + Math.random() * 8900);
      const order = await onSubmitOrder({
        orderNumber: `MK-${randomNum}`,
        customerName,
        phone,
        address,
        postalCode,
        paymentMethod,
        shippingSpeed,
        giftNote: giftNote.trim(),
        shippingFee,
        total,
        items,
      });
      setActiveOrder(order);
      setStep('confirmed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setCustomerName('');
      setPhone('');
      setAddress('');
      setPostalCode('');
      setGiftNote('');
    }
    onClose();
  };

  const receiptToShow = activeOrder || lastOrder;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-[#12151C] text-white h-full flex flex-col shadow-2xl border-l border-white/12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">
            {step === 'bag' && 'Shopping Bag'}
            {step === 'checkout' && 'Delivery & Gift Options'}
            {step === 'confirmed' && 'Order Confirmed'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close shopping bag"
            className="p-2 -mr-2 text-[#9CA3AF] hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'confirmed' && receiptToShow ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-[#D4A853] mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-white mb-2">
                Order #{receiptToShow.orderNumber} Confirmed
              </h3>
              <p className="text-sm text-[#D1D5DB] mb-6">
                Preparing {receiptToShow.shippingSpeed.toLowerCase()} shipment ({receiptToShow.itemCount}{' '}
                {receiptToShow.itemCount === 1 ? 'jacket' : 'jackets'}) for {receiptToShow.customerName}.
              </p>
              <div className="bg-[#090A0D] border border-white/10 rounded-xl p-4 text-left text-xs text-[#D1D5DB] space-y-2 mb-8">
                <div><span className="font-semibold text-white">Status:</span> Preparing Shipment</div>
                <div><span className="font-semibold text-white">Total Paid:</span> <span className="tabular-nums text-[#D4A853]">${receiptToShow.total}</span> ({receiptToShow.paymentMethod})</div>
                <div><span className="font-semibold text-white">Delivery:</span> {receiptToShow.address}, {receiptToShow.postalCode}</div>
                <div><span className="font-semibold text-white">Contact:</span> {receiptToShow.phone}</div>
                {receiptToShow.giftNote && (
                  <div><span className="font-semibold text-white">MK Gift Card:</span> “{receiptToShow.giftNote}”</div>
                )}
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 bg-[#D4A853] text-[#090A0D] text-sm font-semibold rounded-lg hover:bg-[#E2BA6B] transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center space-y-6">
              <div>
                <p className="font-display text-base font-semibold text-white mb-2">
                  Your bag is empty
                </p>
                <p className="text-sm text-[#9CA3AF]">
                  Explore boys and girls MK jackets from toddler sizes to adult fits.
                </p>
              </div>

              {lastOrder && (
                <div className="p-4 rounded-xl bg-[#090A0D] border border-white/10 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#D4A853]">
                      <PackageCheck className="w-4 h-4" />
                      Recent Order #{lastOrder.orderNumber}
                    </span>
                    <span className="text-[#9CA3AF]">{lastOrder.createdAt}</span>
                  </div>
                  <p className="text-xs text-[#D1D5DB]">
                    {lastOrder.itemCount} {lastOrder.itemCount === 1 ? 'jacket' : 'jackets'} ·{' '}
                    <span className="tabular-nums font-semibold text-white">${lastOrder.total}</span> · Preparing Shipment
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 bg-[#D4A853] text-[#090A0D] text-sm font-semibold rounded-lg hover:bg-[#E2BA6B] transition-colors cursor-pointer"
              >
                Browse Jackets
              </button>
            </div>
          ) : step === 'bag' ? (
            <div className="space-y-5">
              {/* Free Shipping Status */}
              <div className="p-3.5 bg-[#090A0D] rounded-lg border border-white/10 text-xs text-[#D1D5DB]">
                {remainingForFreeShipping === 0 ? (
                  <span className="font-medium text-[#D4A853]">
                    Free standard shipping unlocked on this order.
                  </span>
                ) : (
                  <span className="tabular-nums">
                    Add <strong className="text-white">${remainingForFreeShipping}</strong> more for free standard shipping.
                  </span>
                )}
              </div>

              {/* Itemized List */}
              <ul className="divide-y divide-white/10">
                {items.map((item) => (
                  <li key={`${item.jacket.id}-${item.size.label}`} className="py-4 flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#090A0D] border border-white/10 shrink-0">
                      <SafeImage
                        src={item.jacket.image}
                        alt={item.jacket.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-sm font-semibold text-white truncate">
                          {item.jacket.name}
                        </h3>
                        <span className="text-sm font-semibold text-[#D4A853] tabular-nums shrink-0">
                          ${item.jacket.price * item.quantity}
                        </span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">
                        Size {item.size.label} ({item.size.ageRange}) · {item.jacket.colorName}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-white/15 rounded-md bg-[#090A0D]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.jacket.id, item.size.label, -1)}
                            aria-label="Decrease quantity"
                            className="p-1.5 text-[#9CA3AF] hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold tabular-nums text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.jacket.id, item.size.label, 1)}
                            aria-label="Increase quantity"
                            className="p-1.5 text-[#9CA3AF] hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.jacket.id, item.size.label)}
                          aria-label="Remove item"
                          className="p-1.5 text-[#9CA3AF] hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="co-name">
                  Full Name
                </label>
                <input
                  id="co-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Amina Khan"
                  className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-white/15 rounded-lg text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#D4A853]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="co-phone">
                  Phone Number
                </label>
                <input
                  id="co-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-8910"
                  className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-white/15 rounded-lg text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#D4A853]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="co-address">
                    Street Address
                  </label>
                  <input
                    id="co-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="420 Oakridge Avenue"
                    className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-white/15 rounded-lg text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#D4A853]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="co-postal">
                    Postal Code
                  </label>
                  <input
                    id="co-postal"
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10012"
                    className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-white/15 rounded-lg text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#D4A853]"
                  />
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-white mb-2">
                  Shipping Speed
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['Standard', 'Express'] as const).map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => setShippingSpeed(speed)}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer tabular-nums ${
                        shippingSpeed === speed
                          ? 'bg-[#D4A853] text-[#090A0D] border-[#D4A853]'
                          : 'bg-[#090A0D] text-white border-white/15'
                      }`}
                    >
                      {speed === 'Standard'
                        ? `Standard (${standardFee === 0 ? 'Free' : '$12'})`
                        : 'Express 2-Day ($18)'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-white mb-2">
                  Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['Cash on Delivery', 'Card'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                        paymentMethod === method
                          ? 'bg-[#D4A853] text-[#090A0D] border-[#D4A853]'
                          : 'bg-[#090A0D] text-white border-white/15'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1.5" htmlFor="co-gift">
                  Complimentary MK Gift Note (Optional)
                </label>
                <input
                  id="co-gift"
                  type="text"
                  maxLength={90}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Happy birthday! Stay warm in MK."
                  className="w-full px-3.5 py-2.5 bg-[#090A0D] border border-white/15 rounded-lg text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#D4A853]"
                />
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-white/10 bg-[#090A0D] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
              <span>{shippingSpeed} Shipping</span>
              <span className="tabular-nums text-white">{shippingFee === 0 ? 'Free' : `$${shippingFee}`}</span>
            </div>
            <div className="flex items-center justify-between text-base font-display font-bold text-white">
              <span>Total</span>
              <span className="tabular-nums text-[#D4A853]">${total}</span>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 bg-[#D4A853] hover:bg-[#E2BA6B] text-[#090A0D] text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="px-4 py-3.5 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 bg-[#D4A853] hover:bg-[#E2BA6B] disabled:opacity-60 text-[#090A0D] text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Confirming Order...' : `Confirm Order ($${total})`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
