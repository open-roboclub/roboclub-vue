import { firebaseAction } from 'vuexfire'

export const state = () => ({
  inventory: {},
  inventoryRef: null
})

export const mutations = {
  setInventoryRef: (state, inventoryRef) => {
    state.inventoryRef = inventoryRef
  }
}

export const actions = {
  setInventoryRef: firebaseAction(
    ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
      bindFirebaseRef('inventory', ref, callbacks)
      commit('setInventoryRef', ref)
    }
  )
}
