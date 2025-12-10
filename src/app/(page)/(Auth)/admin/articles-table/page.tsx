import { ARTICLE_PER_PAGE } from '@/utils/constants';
import { Article } from '@prisma/client';
import Link from 'next/link';
import { getArticles  } from '@/apiCalls/articleApiCall';
import Pagination from '@/app/_componant/Articles/Pagination';
import DeleteArticleButton from './DeleteArticleButton';
import prisma from '@/type/db';

interface AdminArticlesTableProps {
  searchParams : {pageNumber : string}
}

export default async function AdminArticlesTable({searchParams : {pageNumber}} : AdminArticlesTableProps) {
    const articles:Article[] = await getArticles(pageNumber);
    const count:number = await prisma.article.count();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE)

  return (
    <section className='p-5'>
      <h1 className='mb-7 text-2xl font-semibold text-gray-700'>Articles</h1>
      <table className='table w-full text-left'>
        <thead className='border-t-2 border-b-2 border-gray-500 lg:text-xl'>
          <tr>
            <th className='p-1 lg:p-2'>title</th>
            <th className='hidden lg:table-cell'>Created At</th> 
            <th className='p-1 lg:p-2'>Actions</th>
            <th className='hidden lg:table-cell'></th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article => (
            <tr key={article.id} className='border-t border-b border-gray-300 '>
              <td className='p-3 text-gray-700'>{article.title}</td>
              <td className='p-3 text-gray-700 font-normal lg:table-cell hidden'>{new Date(article.createdAt).toDateString()}</td>
              <td className='p-3 text-gray-700 font-normal inline-block '>
                <Link href={`/admin/articles-table/edit/${article.id}`}
                  className='bg-green-600 text-white rounded-lg py-1 px-2 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-green-800 transition'
                >Edit</Link>
                <DeleteArticleButton articleId={article.id}/>
              </td>
              <td className='hidden lg:table-cell p-3'>
                <Link href={`/articles/${article.id}`} className='text-white bg-blue-600 rounded-lg p-2 hover:bg-blue-800'>Read More</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pageNumber={parseInt(pageNumber)} pages={pages} route='/admin/articles-table' />
    </section>
  )
}
