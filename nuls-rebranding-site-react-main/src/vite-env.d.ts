/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
