import razorpay from '../utils/razorpay.utils.js';

function createOrder(req, res) {
    const { amount } = req.body;

    const amountInPaise = amount * 100;

    const options = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: 'receipt#1',
        payment_capture: 1
    };

    razorpay.orders.create(options, (err, order) => {
        if (err) {
            console.log('Error creating Razorpay order:', err);
            return res.status(500).json({ message: 'Error creating order' });
        }

        res.json({ id: order.id, amount: amountInPaise });
    });
}

function verifyPayement(req, res) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto.createHmac('sha256', '0pC18zL9KFHVMnFbSZOwE4Fb')
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (generated_signature === razorpay_signature) {

        res.status(200).json({ message: 'Payment successful' });
    } else {

        res.status(400).json({ message: 'Payment verification failed' });
    }
}

export  {createOrder,verifyPayement};