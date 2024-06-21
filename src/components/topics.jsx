import {useEffect, useState} from "react"
import  { getTopics } from "../utils/api"
import ErrorComponent from "./error-component";
import { Link } from "react-router-dom"


const Topics = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [topics, setTopics] = useState([])
    const [err, setErr] = useState(null)
 

useEffect(() => {
    setIsLoading(true)
    getTopics().then(({topics}) => {
        setTopics(topics)
        setIsLoading(false)
}).catch((err) => {
    setErr(err)}
  ) }, [])


if(isLoading){
    return <p className="Loading">Loading...</p>
}

if (err) {
    return <ErrorComponent message={err} />;
  }

return (
    <ol className="Topic_list">
        {topics.map((topic) => (
            <li key={topic.slug}>
                <Link to={`/articles?topic=${topic.slug}`}><p>{topic.slug}</p></Link>
                <p>{topic.description}</p>
                </li>
        ))}
    </ol>
)
}

export default Topics