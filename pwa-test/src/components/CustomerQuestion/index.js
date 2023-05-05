// /*
//  * @author    Tigren Solutions <info@tigren.com>
//  * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
//  * @license   Open Software License ("OSL") v. 3.0
//  */
//
// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { List, Page, Title } from '@magento/peregrine';
// import { gql } from '@apollo/client';
//
// const GET_QUESTIONS = gql`
//   query getQuestions($pageSize: Int!, $currentPage: Int!) {
//     customerQuestions(pageSize: $pageSize, currentPage: $currentPage) {
//       items {
//         id
//         customer_name
//         title
//         content
//       }
//       total_count
//       page_info {
//         current_page
//         page_size
//         total_pages
//       }
//     }
//   }
// `;
//
// const QuestionList = () => {
//     const { data, error, loading } = useQuery(GET_QUESTIONS, {
//         variables: { pageSize: 10, currentPage: 1 },
//         fetchPolicy: 'cache-and-network'
//     });
//
//     if (loading) {
//         return <p>Loading...</p>;
//     }
//
//     if (error) {
//         return <p>Error</p>;
//     }
//
//     const { items, total_count } = data.customerQuestions;
//
//     return (
//         <List
//             items={items}
//             render={({ id, customer_name, title, content }) => (
//                 <div key={id}>
//                     <h2>{title}</h2>
//                     <p>{content}</p>
//                     <p>Submitted by: {customer_name}</p>
//                 </div>
//             )}
//         />
//     );
// };
//
// const QuestionCreate = () => {
//     const [formValues, setFormValues] = useState({
//         customer_name: '',
//         title: '',
//         content: ''
//     });
//
//     const [submitQuestion] = useMutation(CREATE_QUESTION);
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         submitQuestion({
//             variables: {
//                 input: formValues
//             }
//         }).then(() => {
//             setFormValues({
//                 customer_name: '',
//                 title: '',
//                 content: ''
//             });
//         });
//     };
//
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormValues((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Name:
//                 <input type="text" name="customer_name" value={formValues.customer_name} onChange={handleChange} />
//             </label>
//             <label>
//                 Title:
//                 <input type="text" name="title" value={formValues.title} onChange={handleChange} />
//             </label>
//             <label>
//                 Content:
//                 <textarea name="content" value={formValues.content} onChange={handleChange} />
//             </label>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };
//
// const QuestionEdit = ({ question }) => {
//     const [formValues, setFormValues] = useState({
//         customer_name: question.customer_name,
//         title: question.title,
//         content: question.content
//     });
//
//     const [updateQuestion] = useMutation(UPDATE_QUESTION);
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         updateQuestion({
//             variables: {
//                 id: question.id,
//                 input: formValues
//             }
//         });
//     };
//
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormValues((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Name:
//                 <input type="text" name="customer_name" value={formValues.customer_name} onChange={handleChange} />
//             </label>
//             <label>
//                 Title:
//                 <input type="text" name="title" value={formValues.title} onChange={handleChange} />
//             </label>
//             <label>
//                 Content:
//                 <textarea name="content" value={formValues.content} onChange={handleChange} />
//             </label>
//             <button type="submit">Save</button>
//         </form>
//     );
// };
//
// const CustomerQuestion = () => {
//     const { loading, error, data } = useQuery(GET_QUESTIONS);
//
//     if (error) {
//         return <div>XError: {error.message}</div>;
//     }
//
//     if (loading) {
//         return <LoadingIndicator />;
//     }
//
//     const { questions } = data;
//
//     return (
//         <React.Fragment>
//             <Title>{'Questions'}</Title>
//             <QuestionList questions={questions} />
//         </React.Fragment>
//     );
// };
//
// export default CustomerQuestion;
