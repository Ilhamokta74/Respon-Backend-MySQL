const {createClient} = require('@supabase/supabase-js')

//const SUPABASE_KEY = PROCESS.ENV.SUPABASE_KEY
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrenZhbnZia3J4Y25xeGlucW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkwNTA5MDMsImV4cCI6MTk4NDYyNjkwM30.7M_dmFmLqBKeGX_HWcLURlfWNML207s5zVOt9PcaNtU"
const SUPABASE_URL = "https://qkzvanvbkrxcnqxinqmr.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const list = async (req, res) => {
    try { 
        const { data, error } = await supabase
            .from('bangke')
            .select('*')
        if (error) {
            return res.json(error)
        }

        res.json(data)
    } catch (error) {
        return res.json(error)
    }    
}

module.exports = {
    list
}