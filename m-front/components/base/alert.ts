import swal from 'sweetalert'

type alertType = 'success' | 'info' | 'warning' | 'error'

export const swalAlert = (message: string, type: alertType) =>
  swal({
    title: message,
    icon: type,
    buttons: false as any,
    timer: 1000
  })

export const deleteAlert = (popName: string) =>
  swal({
    title: `【 ${popName} 】を本当に削除しますか？`,
    icon: 'warning',
    buttons: {
      cancel: 'いいえ',
      ok: 'はい'
    } as any
  })
