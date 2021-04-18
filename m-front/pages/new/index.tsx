import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from '../../helper/firebaseAuthHelper';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';


export default function NewPage() {
  const [user, loading] = useAuthState(getAuth());
  const router = useRouter();
  const [form, setForm] = useState({ title: '', body: '' });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()

  if (loading) {
    return <div className='py-20 text-center'>Loading...</div>;
  }

  if (!loading && !user) {
    router.push('/login');
  }

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const submit = () => {
    const request = async () => {
      setIsSubmitting(true)
      if (user) {
        const token = await user.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        try {
          await axios.post('/posts', { post: form }, config);
          router.push('/');
        } catch (error) {
          console.log(error.message);
          setError(error.message);
          setIsSubmitting(false);
        }
      }
    };
    request();
  };

  return (
    <div></div>
  );
}