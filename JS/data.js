async function showData() {
    try {
        const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos/2014-3');
        if (!response.ok) {
            throw new error('No se pudo obtener la lista')
        }
        const data = await response.json();
        return data;        
        

    } catch (error) {
        console.error('Ocurrió un error al obtener las marcas')
    }
}
showData()
    .then(marcas => {
        console.log('Marcas de carros obtenidas:', marcas);
    })
    .catch(error => {
        console.error('Error general:', error.message);
    });