
export const fetchClient = (url: string, options: object) => {
  return fetch(url, options)
    .then((res: any) => {
      const status: number = res.status
      if (status !== 200) {
        return { success: false, status }
      }
      return res.json().then((body: any) => {
        return { success: true, status, body }
      })
    })
    .catch((e: any) => {
      return { success: false, status: 404, body: e.value }
    }) as any
}
