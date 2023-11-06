import React from 'react'

const Form = ({ title, setTitle, body, setBody, buttonTitle, handlerFunction }) => {
  
  return (
    <main>
      <section className="mt-5 max-w-3xl mx-auto">
        <h1 className="text-gray-600 capitalize text-3xl font-bold px-4 mb-5">
          create blog post
        </h1>
        <form action="" className="flex flex-col gap-4 px-4" onSubmit={handlerFunction}>
          <div className="">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="large-input"
              className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Blog Post
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 h-[300px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 uppercase rounded-md hover:opacity-90 disabled:opacity-80 w-full mt-4"
          >
            {buttonTitle}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Form