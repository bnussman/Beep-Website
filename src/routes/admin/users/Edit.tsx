import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import api from '../../../api';
import User from '../../../types/User';
import { Heading3, Heading5 } from '../../../components/Typography';
import { Formik, Form, Field } from 'formik';
import APIResultBanner from '../../../components/APIResultBanner';

function EditUserPage(props) {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User>(null);
    const [response, setResponse] = useState<any>(null);

    async function fetchUser(userId) {
        const { user } = await api.users.get(userId);
        setUser(user);
    }

    async function updateUser(values) {
        const data = await api.users.editUser(userId, values);
        console.log(data);
        setResponse(data);
    }

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

    if (!user) {
        return <p>Loading</p>;
    }

    return (
        <>
            <Heading3>Edit User</Heading3>
            {response && <APIResultBanner response={response} setResponse={setResponse}/>}

            <Formik
                initialValues={user}
                onSubmit={async (values, { setSubmitting }) => {
                    await updateUser(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {Object.keys(user).map((key) => {
                            return (
                                <div key={key}>
                                    <Heading5>{key}</Heading5>
                                    <Field type="text" name={key} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"/>
                                </div>
                            );
                        })}
                        <button
                            type="submit"
                            className={`mt-3 inline-flex justify-center py-2 px-4 mr-1 border  text-sm font-medium rounded-md text-white shadow-sm bg-yellow-500 hover:bg-yellow-600 focus:outline-white`}
                            disabled={isSubmitting}>
                            Update User
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default EditUserPage;
