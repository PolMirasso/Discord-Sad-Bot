addEventListener('DOMContentLoaded', () =>{
    const contadores = document.querySelectorAll('.contador_cantidad')
    const velocidad = 1000
    
    const adnimarContadores = () => {
        for (const contador of contadores) {
            const actualizarcon = () =>{
                let cantidadmax = +contador.dataset.cantidadTotal
                let valor_actual = +contador.innerText,
                incremento = cantidadmax / velocidad

                if(valor_actual < cantidadmax){
                    contador.innerText = Math.ceil(valor_actual + incremento)
                    setTimeout(actualizarcon, 5)
                }else{
                    contador.innerText = cantidadmax
                }
            }
            actualizarcon()
        }
    }

    const mostarContadores = elementos => {
        elementos.forEach(elemento => {
            if(elemento.isIntersecting){
                elemento.target.classList.add('animar')
                elemento.target.classList.remove('ocultar')
                setTimeout(adnimarContadores, 300)
            }
        });
    }

  const observer = new IntersectionObserver(mostarContadores, {
      threshold: 0.75
  })

  const elementosHTML = document.querySelectorAll('.contador')
  elementosHTML.forEach(elementoHTML => {
      observer.observe(elementoHTML)
  })
})