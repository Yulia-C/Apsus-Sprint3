
import { mailService } from "../services/mail.service.js"
import { getTruthyValues } from "../../../services/util.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailMenu } from "../cmps/MailMenu.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"

const { useState, useEffect, Fragment } = React
const { Link, useSearchParams } = ReactRouterDOM


export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [searchParams, setSearchParams] = useSearchParams()

    const truthyFilter = getTruthyValues(filterBy)

    useEffect(() => {
        loadMails()
        setSearchParams(getTruthyValues(filterBy))
    }, [filterBy])


    function loadMails() {
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {

            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

        }
        if (field === 'isRead' || field === 'isStarred') {
            if (value === 'true') value = true
            else if (value === 'false') value = false
            else if (value = '') value = null
        }

        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onToggleCheckbox(mailId) {
        setMails(prevMails => {
            const upDatedMails = prevMails.map(mail => {
                if (mail.id === mailId) {
                    const updatedMail = { ...mail, isChecked: !mail.isChecked }
                    mailService.save(updatedMail)
                    return updatedMail
                }
                return mail
            })
            return upDatedMails
        })
    }

    function onToggleStar(mailId) {
        setMails(prevMails => {
            const upDatedMails = prevMails.map(mail => {
                if (mail.id === mailId) {
                    const updatedMail = { ...mail, isStarred: !mail.isStarred }
                    mailService.save(updatedMail)
                    return updatedMail
                }
                return mail
            })
            return upDatedMails
        })
    }

    function onMoveToTrash(mailId) {
           console.log('onMoveToTrash');
    //     setMails(prevMails => {
    //         const upDatedMails = prevMails.map(mail => {
    //             if (mail.id === mailId) {
    //                 const updatedMail = { ...mail, status: 'trash' }
    //                 mailService.save(updatedMail)
    //                 return updatedMail
    //             }
    //             return mail
    //         })
    //         return upDatedMails
    //     })
    }

    function onReply(mailId) {
    
    }
    
    function onToggleRead(mailId) {
    setMails(prevMails => {
            const upDatedMails = prevMails.map(mail => {
                if (mail.id === mailId) {
                    const updatedMail = { ...mail, isRead: !mail.isRead }
                    mailService.save(updatedMail)
                    return updatedMail
                }
                return mail
            })
            return upDatedMails
        })
    }

    if (!mails) return <div>Loading...</div>
    return (
        <Fragment>
            <section className="mail-index container">

                <MailFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />
                <form className="mail-filter">
                    <select id="isRead" onChange={handleChange} className="isRead" name="isRead">
                        <option value="">All mails</option>
                        <option value={true}>Read</option>
                        <option value={false}>Unread</option>
                    </select>

                    <select id="isStarred" name="isStarred" onChange={handleChange}>
                        <option value="">⭐ All mails</option>
                        <option value="true">Starred</option>
                        <option value="false">Unstarred</option>
                    </select>
                </form>

                <section className="flex row">
                    <MailMenu />
                    <MailList mails={mails} onToggleCheckbox={onToggleCheckbox}
                        onToggleStar={onToggleStar}
                        onReply={onReply}
                        onToggleRead={onToggleRead}
                        onMoveToTrash={onMoveToTrash} />
                </section>
            </section>
        </Fragment>
    )
}
