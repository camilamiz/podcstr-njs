//SPA
// [] - significa que os dados são carregados quando se acessa a aplicação
// crawlers - por causa disso, essa não é uma solução boa, pois se não der tempo de carregar, a página simplesmente não mostra a informação

// import { useEffect } from "react";

// export default function Home() {
//   useEffect(() => {
//     fetch('http://localhost:3333/episodes')
//       .then(response => response.json())
//       .then(data => console.log(data))
//   }, [])
//   return (
//     <h1>Index</h1>
//   );
// }


//SSR
// a api é acessada todas as vezes que alguém acessa a aplicação
// export default function Home(props) {  return (
//   <div>
//     <h1>Index</h1>
//     <p>{JSON.stringify(props.episodes)}</p>
//   </div>
//   );
// }

// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()

//   return {
//     props: {
//       episodes: data,
//     }
//   }
// }

//SSG
// versão estática da página - a primeira pessoa que acessar, faz o request e todas as outras pessoas acessam o html estático
// revalidate - em segundos - de qto em qto tempo quero uma nova chamada da api

export default function Home(props) {  return (
  <div>
    <h1>Index</h1>
    <p>{JSON.stringify(props.episodes)}</p>
  </div>
  );
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
