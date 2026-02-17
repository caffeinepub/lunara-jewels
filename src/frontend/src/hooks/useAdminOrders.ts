import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { OrderRequest } from '../backend';

export function useListOrderRequests() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<OrderRequest[] | null>({
    queryKey: ['orderRequests'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const orders = await actor.listOrderRequests();
        return orders;
      } catch (error: any) {
        // Check if it's an authorization error
        if (error?.message?.includes('Unauthorized')) {
          return null; // Return null to indicate unauthorized
        }
        throw error;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useGetOrderRequest(id: bigint | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<OrderRequest | null>({
    queryKey: ['orderRequest', id?.toString()],
    queryFn: async () => {
      if (!actor || !id) throw new Error('Actor or ID not available');
      
      try {
        const order = await actor.getOrderRequest(id);
        return order;
      } catch (error: any) {
        if (error?.message?.includes('Unauthorized')) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!actor && !actorFetching && id !== null,
    retry: false,
  });
}
