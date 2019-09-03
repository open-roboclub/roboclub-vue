<template>
  <v-img :src="resizedSrc" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: -1
    },
    width: {
      type: Number,
      default: -1
    }
  },
  computed: {
    resizedSrc() {
      if (this.width > 0 || this.height > 0) {
        const url = new URL(this.src)

        if (url.hostname === 'res.cloudinary.com') {
          const separator = '/image/upload/'

          const parts = this.src.split(separator)

          if (parts.length > 1) {
            const transforms = []
            if (this.height > 0) transforms.push(`h_${this.height}`)
            if (this.width > 0) transforms.push(`w_${this.width}`)

            const resizedUrl = [
              parts[0],
              separator,
              transforms.join(','),
              '/',
              ...parts.slice(1)
            ].join('')

            return resizedUrl.replace(/.(jpg|jpeg|png|bmp)$/, '.webp')
          }
        }
      }

      return this.src
    }
  }
}
</script>
