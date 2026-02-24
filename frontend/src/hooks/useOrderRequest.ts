import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CartItem } from '../backend';

interface OrderRequestInput {
  customerName: string;
  customerEmail: string;
  shippingNote: string;
  items: CartItem[];
  totalAmount: bigint;
}

export function useSubmitOrderRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: OrderRequestInput) => {
      if (!actor) throw new Error('Actor not available');
      
      const orderId = await actor.submitOrderRequest(
        input.customerName,
        input.customerEmail,
        input.shippingNote,
        input.items,
        input.totalAmount
      );
      
      return orderId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderRequests'] });
    },
  });
}

