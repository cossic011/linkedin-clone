import Head from "next/head";
import { getSession, signOut, useSession } from "next-auth/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import Feed from "../components/Feed";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { modalOpen } from "../features/modal/modalSlice";
import { connectToDatabase } from "../util/mongodb";
import Widgets from "../components/Widgets";
import axios from "axios";

export default function Home({ posts, articles }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/home");
    },
  });
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.modal.modalState);
  const modalTypeState = useSelector((state) => state.modal.modalType);

  // const [modalOpen, setModalOpen] = useState(modalState.default);
  // const [modalType, setModalType] = useState(modalTypeState.default);

  return (
    <div className="bg-[#F3F2EF] dark:bg-black h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row px-4 gap-5">
          <Sidebar />
          <Feed posts={posts} />
        </div>
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalState.default && (
            <Modal
              handleClose={() => dispatch(modalOpen())}
              type={modalTypeState.default}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // Check if the user is authenticated on the server...
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  // Get posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timestamp: -1 })
    .toArray();

  // Get Google News API
  const { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  );

  return {
    props: {
      session,
      articles: data.articles,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        usernamename: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
    },
  };
}
