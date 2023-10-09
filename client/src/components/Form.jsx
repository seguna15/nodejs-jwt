import React from 'react'

const Form = () => {
  return (
    <main>
      <section className="mt-5 max-w-3xl mx-auto">
        <h1 className="text-gray-600 capitalize text-3xl font-bold text-center">
          create blog post
        </h1>
        <form action="" className="flex flex-col gap-4">
          <div class="">
            <label
              for="large-input"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="large-input"
              class="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Blog Post
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 h-[300px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          <button
            type="submit"
            
            className="bg-slate-700 text-white p-3 uppercase rounded-md hover:opacity-90 disabled:opacity-80"
          >
            Post Blog
          </button>
        </form>
      </section>
    </main>
  );
}

export default Form