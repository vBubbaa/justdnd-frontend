<template>
  <div></div>
</template>

<script>
export default {
  head() {
    return {
      title: `JustRollDnD | Logout`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: `Logout of JustRollDnD.`,
        },
      ],
    };
  },
  async created() {
    await this.$auth.logout();
  },
};
</script>
