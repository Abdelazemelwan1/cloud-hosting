import { getSingleArticle } from '@/apiCalls/articleApiCall';
import { Article } from '@prisma/client';
import React from 'react'
import EditArticleFrom from './EditArticleFrom';

interface EditArticlePageProps {
    params: {id : string}
}

export default async function EditArticlePage({params} : EditArticlePageProps) {
    const article : Article = await getSingleArticle(params.id)

  return (
    <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
        <div className='shadow p-4 bg-purple-200 rounded w-full'>
            <h2 className='text-2xl text-gray-700 font-semibold mb-4'>Edit Article</h2>
            <EditArticleFrom article={article}/>
        </div>
    </section>
  )
}
