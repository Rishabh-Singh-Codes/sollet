const PayField = () => {
    return (
        <div className="border border-slate-400 pr-1 pl-3 py-1 rounded-3xl flex">
            <input type="text" className="flex-grow outline-none bg-transparent text-xs" disabled placeholder="Enter the SOL amount" />
            <span className="bg-slate-400 py-1 px-3 rounded-xl text-sm">Send</span>
        </div>
    )
}

export default PayField;