import { firebaseAction } from 'vuexfire'
import { db } from '@/plugins/firebase'

const inventoryRef = db.ref('inventory/inventoryItems')
const requestsRef = db.ref('inventory/requests')

function clearEntry(entry) {
  if (!entry) {
    entry = {}
  }

  entry.name = ''
  entry.allotted = 0
  entry.total = 0
  entry.working = 0

  return entry
}

function copyEntry(source, destination) {
  destination.name = source.name
  destination.allotted = source.allotted
  destination.working = source.working
  destination.total = source.total

  return destination
}

function getIndex(name) {
  let index
  inventoryRef
    .orderByChild('name')
    .equalTo(name)
    .on('value', function(snapshot) {
      snapshot.forEach(item => {
        index = item.key
      })
    })
  return index
}

function getItemIndex(type, name) {
  let index
  inventoryRef
    .child(type)
    .child('items')
    .orderByChild('name')
    .equalTo(name)
    .on('value', function(snapshot) {
      snapshot.forEach(item => {
        index = item.key
      })
    })
  return index
}

export const state = () => ({
  inventory: [],
  entry: clearEntry(),
  requests: []
})

export const mutations = {
  resetEntry: state => {
    clearEntry(state.entry)
  },
  setEntry: (state, payload) => {
    state.entry = payload
  }
}

export const actions = {
  setInventoryRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('inventory', inventoryRef)
  }),

  setRequestsRef: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('requests', requestsRef)
  }),

  deleteEntry: (_, payload) => {
    const itemIndex = getItemIndex(payload[1], payload[0].name)
    inventoryRef
      .child(payload[1])
      .child('items')
      .orderByChild('name')
      .equalTo(payload[0].name)
      .ref.child(itemIndex)
      .remove()
  },

  saveEntry: ({ state }, payload) => {
    const itemIndex = getItemIndex(payload[1], payload[0].name)
    let entry = []
    entry = copyEntry(state.entry, entry)
    inventoryRef
      .child(payload[1])
      .child('items')
      .orderByChild('name')
      .equalTo(payload[0].name)
      .ref.child(itemIndex)
      .set(entry)
  },

  addEntry: ({ state, commit }, payload) => {
    const typeIndex = getIndex(payload)
    inventoryRef
      .child(typeIndex)
      .child('items')
      .push(state.entry)
    commit('resetEntry')
  },

  sendRequest: (_, payload) => {
    const request = {
      itemName: payload[0],
      name: payload[2],
      quantity: payload[1],
      type: payload[3],
      email: payload[4]
    }
    requestsRef.push(request)
  },

  setEntryValue: ({ commit }, payload) => {
    commit('setEntry', payload)
  },

  seenRequest: (_, payload) => {
    requestsRef.child(payload).remove()
  }
}

export const getters = {
  inventory: state => state.inventory,
  entry: state => state.entry,
  requests: state => state.requests,
  inventoryTypes: state => state.inventory.map(item => item.name)
}
