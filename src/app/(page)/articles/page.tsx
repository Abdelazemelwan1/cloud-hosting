// "use client";
import { getArticles  } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/app/_componant/Articles/ArticleItem";
import Pagination from "@/app/_componant/Articles/Pagination";
import SearchArticleInput from "@/app/_componant/Articles/SearchArticleInput";
import prisma from "@/type/db";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article  } from "@prisma/client";


interface ArticlesPageProps {
  searchParams : {pageNumber : string}
}



const ArticlePage = async ({searchParams} : ArticlesPageProps) => {

  const {pageNumber} = searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count:number = await prisma.article.count();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE) ;

  return (<>
    <section className="container m-auto px-5">
      <SearchArticleInput/>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {articles.map((item) =>  <ArticleItem  article={item} key={item.id}/>)}
      </div>
      <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages}/>
    </section>
  </>)
}



export default ArticlePage;

