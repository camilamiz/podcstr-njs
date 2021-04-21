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

import { GetStaticProps } from 'next';
import { api } from '../services/api';
import ptBR from 'date-fns/locale/pt-BR'
import { format, parseISO } from 'date-fns'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

type HomeProps = {
  episodes: Episode[];
}

type Episode = {
    id: string;
    title: string;
    members: string;
    published_at: string;
    //..
}

export default function Home(props: HomeProps) {  return (
  <div>
    <h1>Index</h1>
    <p>{JSON.stringify(props.episodes)}</p>
  </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'publisehd_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    };
  })

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
