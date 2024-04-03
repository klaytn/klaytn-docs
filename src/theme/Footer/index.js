import React, {useEffect} from 'react';
import Footer from '@theme-original/Footer';

import { FeedbackButton } from 'pushfeedback-react';
import { defineCustomElements } from 'pushfeedback/loader';
import 'pushfeedback/dist/pushfeedback/pushfeedback.css';
import './custom.feedback.css';

export default function FooterWrapper(props) {

useEffect(() => {
    if (typeof window !== 'undefined') {
    defineCustomElements(window);
    }
}, []);

return (
    <>
    <FeedbackButton project="8ou0itrmqd" button-position="bottom-right" modal-position="bottom-right" button-style="dark" modal-title="Your feedback makes a difference. Let us know how we can do better.">Make this page better</FeedbackButton>
    <Footer {...props} />
    </>
)
}  