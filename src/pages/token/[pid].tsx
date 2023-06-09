import { modifiedJSONData } from '@/Details';
import Button from '@/components/Button';
import Connect from '@/connect';
import TokenModel from '@/schemas/TokenSchema';
import Footer from '@/sections/Footer';
import Navbar from '@/sections/Navbar';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect, useState } from 'react'

interface Props {
  gameID: string;
}

interface Params extends ParsedUrlQuery {
  pid: string;
}

const Index = ({ gameID }: Props) => {

  //Add timeout for request, else let it be

  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [gameDetails, setGameDetails] = useState<modifiedJSONData | null>(null);
  const [gameTitle, setGameTitle] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const getGameDetails = () => {
    axios
      .post('/api/tokens', {
        reqType: "ACTIVATE",
        gameID: gameID,
        email: email
      })
      .then((response) => {
        if (response.data.updated) {
          setGameDetails(response.data.doc);
          setGameTitle(response.data.title);
        } else
          setIsError(true);
      })
      .catch(console.log);
  }

  useEffect(() => {
    if (session) {
      if (session.user) {
        setIsLogged(true);
        setEmail(session.user.email!);
      }
    }
  }, [session]);

  return (
    <>
      <Navbar />
      <main className='shadow-2xl'>
        <h1 className="egiant mt-5">Activate your game</h1>
        {isError === false ? (
          gameDetails === null ? (
            <>
              <div className="text-center mt-2">
                {isLogged === false && (
                  <>
                    <div className="w-full text-center">
                      Email <span className="tsize-small text-[var(--text-alert)]">Please provide valid email address</span>
                    </div>
                    <div className='w-full flex justify-center'>
                      <input type="email" name="email" className="bg-transparent w-full sm:w-[50%] p-2 firaCode border border-1 block" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                  </>
                )}

                <div className='w-full'>
                  <span className="mt-5 block" onClick={() => { getGameDetails() }}><Button sizeClass='tsize-small' text='Activate' /></span>
                </div>
              </div>

              <h2 className="mt-5 mb-5">This link will only work once, please provide valid email address you have provided</h2>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2">
                <div className='text-center'>Game Title:</div>
                <div>{gameTitle}</div>
                <div className='text-center'>Email: </div>
                <div>{gameDetails.user}</div>
                <div className='text-center'>Password: </div>
                <div>{gameDetails.password}</div>
              </div>
              <div className="text-center mt-5">
                Go to <Link className='link' href={'/profile'}>Profile</Link>
              </div>
              <div className="text-center mt-10">
                Please change <b>Email</b> & <b>Password</b> immediatly after logging into your account. <u>We are <b>NOT</b> responsible if you lose your account after getting the information</u>
              </div>
            </>
          )
        ) : (
          <div className="text-center mt-10 mb-10">
            There was an error fetching the game for you, kindly contact the agent you have talked with
          </div>
        )}
      </main >
      <Footer />
    </>
  )
}

export default Index;

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const { pid } = params as Params;
  await Connect();
  try {

    const tokenBefore = await TokenModel.findOne({ tokenID: pid });
    if (!tokenBefore) {
      return {
        notFound: true
      }
    }

    if (tokenBefore.visited) {
      return {
        notFound: true
      }
    }

    const token = await TokenModel.findOneAndUpdate(
      { tokenID: pid },
      { visited: true, claimedOn: Date.now }
    );
    if (!token) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        gameID: token.gameID.toString()
      }
    }
  } catch (err) {
    return {
      notFound: true
    }
  }
}