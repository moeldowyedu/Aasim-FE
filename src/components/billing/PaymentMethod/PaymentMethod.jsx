import { useState } from 'react';
import { Button, Badge, Modal, Input, Alert } from '../../common';
import { CreditCard, Trash2, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentMethod = ({ paymentMethods = [], onAdd, onRemove, onSetDefault }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const handleAddCard = async () => {
    try {
      await onAdd(newCard);
      toast.success('Payment method added successfully');
      setIsAddModalOpen(false);
      setNewCard({ number: '', name: '', expiry: '', cvv: '' });
    } catch (error) {
      toast.error('Failed to add payment method');
    }
  };

  const handleRemove = async (methodId) => {
    if (confirm('Are you sure you want to remove this payment method?')) {
      try {
        await onRemove(methodId);
        toast.success('Payment method removed');
      } catch (error) {
        toast.error('Failed to remove payment method');
      }
    }
  };

  const getCardBrand = (number) => {
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'Amex';
    return 'Card';
  };

  return (
    <div className="space-y-4">
      {/* Payment Methods List */}
      {paymentMethods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white ${
                method.isDefault ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {method.isDefault && (
                <div className="absolute top-3 right-3">
                  <Badge variant="success" size="sm">
                    Default
                  </Badge>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <CreditCard className="w-8 h-8" />
                <button
                  onClick={() => handleRemove(method.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-lg font-medium tracking-wider">
                  •••• •••• •••• {method.last4}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {getCardBrand(method.last4)} ending in {method.last4}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Expires</p>
                  <p className="text-sm font-medium">{method.expiry}</p>
                </div>
                {!method.isDefault && (
                  <Button
                    onClick={() => onSetDefault(method.id)}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Set as Default
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Alert variant="info">
          No payment methods on file. Add a payment method to enable automatic
          billing.
        </Alert>
      )}

      {/* Add Payment Method Button */}
      <Button
        onClick={() => setIsAddModalOpen(true)}
        variant="outline"
        className="w-full md:w-auto"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Payment Method
      </Button>

      {/* Add Payment Method Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Payment Method"
      >
        <div className="space-y-4">
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={newCard.number}
            onChange={(e) =>
              setNewCard({ ...newCard, number: e.target.value })
            }
            maxLength={19}
          />

          <Input
            label="Cardholder Name"
            placeholder="John Doe"
            value={newCard.name}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              value={newCard.expiry}
              onChange={(e) =>
                setNewCard({ ...newCard, expiry: e.target.value })
              }
              maxLength={5}
            />
            <Input
              label="CVV"
              placeholder="123"
              value={newCard.cvv}
              onChange={(e) =>
                setNewCard({ ...newCard, cvv: e.target.value })
              }
              maxLength={4}
              type="password"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setIsAddModalOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCard}
              variant="primary"
              className="flex-1"
              disabled={
                !newCard.number || !newCard.name || !newCard.expiry || !newCard.cvv
              }
            >
              <Check className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentMethod;
