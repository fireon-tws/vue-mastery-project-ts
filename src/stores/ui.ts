import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { ModalState, ToastItem, ToastTone } from '../types/app'

export const useUiStore = defineStore('ui', () => {
  const modal = ref<ModalState>({ isOpen: false, kind: null })
  const toasts = ref<ToastItem[]>([])
  const isModalOpen = computed(() => modal.value.isOpen)
  let nextToastId = 1

  function openModal(kind: string, payload?: unknown) {
    modal.value = {
      isOpen: true,
      kind,
      payload,
    }
  }

  function closeModal() {
    modal.value = {
      isOpen: false,
      kind: null,
    }
  }

  function pushToast(message: string, tone: ToastTone = 'info') {
    const toast: ToastItem = {
      id: nextToastId++,
      message,
      tone,
    }

    toasts.value = [...toasts.value, toast]
    return toast.id
  }

  function removeToast(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  return {
    modal,
    toasts,
    isModalOpen,
    openModal,
    closeModal,
    pushToast,
    removeToast,
  }
})
