import styles from '../../styles/Feed.module.css'; 
import { Toolbar } from '../../components/toolbar'
import { useRouter } from 'next/router'; 

export default function PageById({pageNumber ,articles}){
    const router = useRouter();
    return(<>
        <Toolbar />
        <div className={styles.main}>
        {
            articles.map( (article,index) =>{
                return (
                    <div key={index} className={styles.post}>
                        <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                        <p>{article.description}</p>
                        {
                            !!article.urlToImage && <img src={article.urlToImage} />
                            }
                        <hr />
                    </div>
                )})
        }
        </div>
        <div className={styles.paginator}>
            <div onClick={() => {
                if(pageNumber > 1){
                    router.push(`/feed/${pageNumber - 1}`); 
                }}} 
                className={pageNumber === 1 ? styles.disabled : styles.active}>
                Prev
            </div>
            <div>
                #{pageNumber}
            </div>
            <div onClick={() => {
                if(pageNumber < 5){
                    router.push(`/feed/${pageNumber + 1}`); 
                }}} 
                className={pageNumber === 5 ? styles.disabled : styles.active}>
                Frwd
            </div>
        </div>
    </>
    )
}   

export async function getServerSideProps(Context){
    const { query } = Context;
    const pageNumber = query.pageid;

    if(!pageNumber || pageNumber < 1 || pageNumber > 5 ){
        return {
            props : {
                articles : [],
                pageNumber : '1',
            }
        }
    }

    const apiRes = await fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,{
        headers :{
            Authorization : `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
        }
    })

    const apijson = await apiRes.json();

    const { articles } = apijson;
    
    return {
        props : {
            articles,
            pageNumber : Number.parseInt(pageNumber),
        }
    }
}