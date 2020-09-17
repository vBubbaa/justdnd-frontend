export const state = () => ({
  templateFeats: []
});

export const mutations = {
  // Sets the template feats from a given layout so we can access them in character creation
  SET_TEMPLATE_FEATS(state, feats) {
    state.templateFeats = feats;
  },

  // Clear store feats
  CLEAR_TEMPLATE_FEATS(state) {
    state.templateFeats = [];
  }
};
