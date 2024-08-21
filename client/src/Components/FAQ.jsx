import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Frequently Asked Questions
            </Typography>
            <Divider style={{ marginBottom: '20px' }} />

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">What is included in your sales packages?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Our sales packages typically include a comprehensive analysis of your sales strategy, market research, and tailored recommendations for improvement. We also provide ongoing support and follow-up consultations to ensure that our recommendations are implemented effectively.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">How do I track my sales performance?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        You can track your sales performance using our integrated dashboard, which provides real-time insights into your sales metrics. Additionally, we offer detailed monthly reports that analyze sales trends, customer behavior, and other key performance indicators.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">What is your approach to sales training?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Our sales training programs are designed to be interactive and hands-on. We focus on practical techniques that can be immediately applied to your sales processes. Training sessions cover a range of topics including sales techniques, customer engagement, and closing strategies.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Can I customize the sales strategy to fit my business?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Absolutely! We understand that each business is unique, and our sales strategies are tailored to meet your specific needs and goals. We work closely with you to understand your business model, target audience, and market conditions to develop a customized approach.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">What kind of support do you offer after the sale?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        We offer comprehensive post-sale support including follow-up consultations, troubleshooting assistance, and ongoing advice. Our team is committed to ensuring that you are satisfied with our services and that your sales strategies continue to yield positive results.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FAQ;
