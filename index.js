const ejaan = {
    1 :"satu",
    2 :"dua",
    3 :"tiga",
    4 :"empat",
    5 :"lima",
    6 :"enam",
    7 :"tujuh",
    8 :"delapan",
    9 :"sembilan",
}

const banyak = [
    "ribu",
    "juta",
    "milyar",
    "trilyun",
]

const puluhan = (angka) => {
    return angka[0] == 1
    ? `${angka[1] == 1 ? "sebelas" : angka[1] == 0 ? "sepuluh" : `${ejaan[(angka[1])]} belas`}` 
    : `${ejaan[angka[0]]} puluh ${ejaan[angka[1]] || ""}`
}

const ratusan = (angka) => `${angka[0] == 1 ? "se" : ejaan[angka[0]] + " "}ratus ${parseInt(angka.slice(1, angka.length), 10).toString().length === 1 ? ejaan[parseInt(angka.slice(1, angka.length), 10)] || "" : puluhan(angka.slice(1, angka.length))}`

const toEjaanArray = (array) => array.map(angka => {
    switch (true) {
        case angka.length === 1:
            return `${angka[0] == 1 && array.length === 2 ? "se" : ejaan[angka[0]] || ""}`
        case angka.length === 2:
            return puluhan(angka)
        case angka.length === 3:
            return ratusan(angka)
        default:
            return null
    }
})





/**
 * main func
 * converting numbers to indonesian currency spelling (ID)
 * 
 * @param integer
 * @returns object of string
 */

function convert(param) {
    if (param.toString().length > 15) return "Hanya support hingga 'Milyar'" 

    const numberOfParam = Number(param)

    /**
     * Check if is integer or float
     */
    if(numberOfParam % 1 !== 0) return "Hanya support integer desimal"

    const uang = numberOfParam.toLocaleString("id-ID")

    const arrayUang = uang.replace(",", ".").split(".").map(u => u === '000' ? '0' : parseInt(u, 10).toString())

    const res = toEjaanArray(arrayUang)

    if (parseInt(arrayUang.slice(1, arrayUang.length).join(""), 10) == 0) {
        return {
            nominal: `Rp.${uang}`,
            terbilang: res.join(" ").trim() + `${res[0] === "se" ? "" : " " }` + banyak[res.length - 2] + " rupiah"
        }
    } else {
        const a = res.map((a, i) =>  a && `${i === res.length - 1 ? a.trim() : a.trim() + `${res[0] === "se" ? "" : " " }` + `${a && banyak[(res.length - 2) - i]}`}`)

        return {
            nominal: `Rp.${uang}`,
            terbilang: a.filter(b => b !== "").join(" ").trim() + " rupiah"
        }
    }
}
