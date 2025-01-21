import { GifItem } from "./GifItem";
import { useFetchGifs } from "../hooks/useFetchGifs";

export const GifGrid = ({ category }) => {
  // Con Custom Hooks
  const { images, isLoading } = useFetchGifs(category);

  //Sin Custom HooksSin Custom Hooks
  /*  const [images, setImages] = useState([]);
  const getImages = async () => {
    const newImages = await getGifs(category);
    setImages(newImages);
  };
  useEffect(() => {
    getImages();
  }, []);*/
  return (
    <>
      <h3>{category}</h3>
      {isLoading && <h2>Cargando...</h2>}
      <div className="card-grid">
        {images.map((image) => (
          <GifItem key={image.id} {...image} />
        ))}
      </div>
    </>
  );
};

// UseEffect es un Hook de React que nos ayuda a manejar efectos secundarios de un componente, recordemos que el trabajo de React en su naturaleza es únicamente renderizar elementos en base al cambio de su estado, todo efecto que se desencadene a partir de este renderizado se considerá un efecto secundario; En otras palabras se entiende como un efecto secundario a un proceso que se requiere ejecutar cuando algo suceda en el componente.

// Nota: En nuestro componente el state inicia con un sólo elemento de prueba "Dragon Ball" con el que nuestra Api se llamrá usando useEffect sólo la primera vez que se carga el componente, cuando nosotros realizamos una busqueda, por ejemplo "Naruto", el estado de categoria cambia y se vuelve a renderizar haciendo un map de las categorias para crear un componente GifGrid, sin embargo está nueva carga (dado el ejemplo anterior) sólo solicita la traida de la Api a Naruto, para el componente GifGrid de Dragon Ball no vuelve a redibujar el componente, esto sucede así porque React almacena la key de cada elemento al volverse a renderizar compara la key del nuevo componente con los anteriores y si ya existe no vuelve a montar el componente sino que lo reutiliza (distinto sería si manualmente se proboca el desmontar el componente antes del map).
// Es por esto que es importante el manejo de key de forma adecuada, si por ejemplo usaramos el index de cada elemento como key esto probocaría que por cada map el index pueda llegar a cambiar, por lo tanto no coincida con ningun componente ya montado y realice nuevos montados inecesarios, lo que en nuestro ejemplo ocasionaria que se vuelva a llamar  a la Api inecesariamente para elemento que ya estaban montados (Dragon Ball). Recordemos que en este ejercicio la clave está en que useEffect se está usando sólo para ejecutarse en la fase de montado

// Custom Hook: Los Custom hook son hook personalizados, se usan en casos en los que la lógica de un componente se vuelve muy grande y está lógica puede ser reutilizada en algún otro componente simplemente llamamos a nuestro custom hook y listo. Visto desde una analogía fácil de entender un custom hook es como replegar la lógica, luego al llamarlo desde el componente que se va a necesitar se despliega toda la lógica como si estuviera ahí, lo que hace posible que los cambios de estado del custom hook rendericen el componente en el que se desplego (Similar a las importaciones de PHP)
