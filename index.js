const excelToJson = require('convert-excel-to-json');

const main = async () => {
    let count = 281
    let arr = []
    let thisRow = []

    const result = excelToJson({
        sourceFile: 'Copia de TIPS MOVITRONIA 5,6,7,8.xlsx'
    })

    // console.log(result.Hoja1)

    result.Hoja1.forEach((el, i)=>{
        // console.log(el.A)
        if (el.A === count) {
            if (thisRow[0]) {
                arr.push(thisRow)
            }

            count++
            thisRow = []
            thisRow.push(el)

            // thisRow = []
            // count++

            // thisRow.push(el)
        } else if (i !== 0 && i !== 1) {
            thisRow.push(el)
        }


        // thisRow.push(el)
    })
    // console.log(arr[0])

    // console.log(arr[0])
    // console.log(arr[1])
    // console.log(arr[2])
    // console.log(arr[3])

    let res = parseVector(arr)

    console.log(res)
}

const parseVector = (vector) => {
    let arr = vector.reduce((acc, el, i)=> {
        // console.log(acc)
        // console.log(el)
        // console.log(i)
        let thisRow = el.reduce((accRow, elRow, elI)=> {
            // console.log(elRow.E)
            if (elRow.A) {
                accRow.NUMBER = elRow.A
            }

            if (elRow.B) {
                accRow.TIP = elRow.B
            }

            if (elRow.C) {
                accRow.QUESTION_VF = elRow.C
            }

            if (elRow.D) {
                accRow.SOLUTION_VF = elRow.D
            }

            if (elRow.E && elRow.E !== '') {
                console.log(elRow.A)
                console.log(elRow.E)
                console.log(elRow.E.trim().toLowerCase().replace(" )",")").replace(" a-","a)").replace(" b-","b)").replace(" c-","c)").replace(": a",": a)").replace(":a",": a)").replace(" b ", " b)").replace(" c ", " c)"))
                aux = elRow.E.trim().toLowerCase().replace(" )",")").replace(" a-","a)").replace(" b-","b)").replace(" c-","c)").replace(": a",": a)").replace(":a",": a)").replace(" b ", " b)").replace(" c ", " c)").split("a)")
                // console.log(aux)
                aux_alt_A = aux[1].split("b)")
                aux_alt_B_C = aux_alt_A[1].split("c)")
                accRow.QUESTION_AL = aux[0]
                accRow.VARIABLES = {
                    "a": aux_alt_A[0].replace(")","").trim(),
                    "b": aux_alt_B_C[0].trim(),
                    "c": aux_alt_B_C[1]
                }
            }

            if (elRow.F) {
                accRow.VARIABLES_SOLUTION = elRow.F
            }

            return accRow
        }, {})

        acc.push(thisRow)

        return acc
    }, [])

    return arr
}

// var hola = "conos colchoneta cuerdas y balones corresponde a: a-la clase de matemáticas b-la clase de educación física c-la clase de lenguaje"
// console.log(hola.trim().toLowerCase().replace(":", ": ").replace(")", " ").replace("-"," ").replace(" a ","a)").replace(" b ", "b)").replace(" c ", "c)"))
main()