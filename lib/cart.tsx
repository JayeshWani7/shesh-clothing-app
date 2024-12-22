'use client'

import { productSchema } from '@/lib/schema'
import { createContext, useContext, useReducer } from 'react'
import { z } from 'zod'

export type CartItem = z.infer<typeof productSchema> & {
  quantity: number
}

type CartState = {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<
  | {
      state: CartState
      addItem: (item: CartItem) => void
      removeItem: (id: string) => void
      updateQuantity: (id: string, quantity: number) => void
      clearCart: () => void
    }
  | undefined
>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + (action.payload.price.amount || 0),
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + (action.payload.price.amount || 0),
      }
    }
    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.id === action.payload)
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (item?.price.amount || 0) * (item?.quantity || 0),
      }
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id)
      const quantityDiff = action.payload.quantity - (item?.quantity || 0)
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item?.price.amount || 0) * quantityDiff,
      }
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  })

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

