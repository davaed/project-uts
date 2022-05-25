// Converts numeric to rupiah
const rupiahLocale = new Intl.NumberFormat('id-ID')

export function convertToRupiah(numeric){
    return "Rp. "+rupiahLocale.format(numeric)
}