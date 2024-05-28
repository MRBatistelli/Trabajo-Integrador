
# Los Indomables  –Fuerza y Pasión por los Autos-

Esta es una web dedicada a la venta de autos usados.

https://losindomables.netlify.app/


## Características

La web está compuesta de 8 secciones, en las cuales tratamos de expresar, las tecnologías aprendidas en el curso.
La estructura semántica para el contenido está  realizada en HTML5, usamos CSS3 para estilos, animaciones, transiciones y diseño responsivo (mediante Grid, Flexbox y Media Querys). 
Aplicamos JavaScript para la validación de formularios. En el formulario de ingreso validamos que el userName/mail no esté vacio y que la contraseña tenga al menos 8 caracteres. En la sección de registro además se valida que sea mayor de edad quien se registre y cuenta con una verificación mediante una imagen estilo Capcha, donde el usuario debe colocar el texto correctamente para poder validar la carga del formulario. Se aplicó también JS para poder realizar el renderizado dinámico del header, footer (innerHTML) y para la creación del menú hamburguesa, mediante escucha de eventos y agregado de clases dinámicas para mostrarlo u ocultarlo según sea necesario.
En página principal el consumo de la api es mediante Vue3, se muestran 6 tarjetas con información de diferentes vehículos disponibles para la compra. Tuvimos que recurrir además a la utilización de Promise.All() para obtener los datos, ya que la api que consumimos muestra las características de un solo vehículo en cada consulta. Reunimos las 6 URL en un array para poder realizar las múltiples peticiones HTTP en paralelo. 
En el mismo bloque incorporamos la función para agregar los diferentes ítems al carrito de compras y mantener dicha información en LocalStorage. Las tarjetas son renderizadas desde un template en el mismo componente Vue.
La vista del carrito de compras es mostrada también desde un template en otro componente Vue que tiene las funciones de recuperar y mostrar el carrito almacenado en el LocalStorage, junto a funciones básicas como eliminar un ítem, vaciar el carrito de compras o finalizarlo.
El resto de las secciones se ubican en el footer, son módulos informativos sobre la empresa, acerca de nosotros, contacto, medios de pago y garantía, donde incluimos imágenes, iframe, links, animaciones y transiciones. 

## Authors

### Comisión Nº 24176
### -Grupo 13:
* **DIEGO LAIME**
* **ENZO ESQUERCIA**
* **JOSE GONZALEZ**
* **MAURO BATISTELLI**
