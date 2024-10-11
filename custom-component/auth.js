import supabase from "../api/supabase";

const signUp = (email, passowrd) => {
	try { 
        const { error } = await supabase.auth.signIn({email, password})
        if (error) {
            return res.json(error)
        }
        alert('logged in')
        
    } catch (error) {
        return res.json(error)
    }    
}