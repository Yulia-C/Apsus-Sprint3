import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, useSearchParams } = ReactRouterDOM

export function MailMenu({ isMenuOpen, onOpenModal, defaultFilter, onSetFilterBy, categoryCounts }) {
    const [activeItem, setActiveItem] = useState('inbox')
    const { mailId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()

    function onCategoryChange(newCategory) {
        onSetFilterBy({ category: newCategory })
        if (mailId) {
            navigate(`/mail/?${searchParams.toString()}`)
        }
    }

    useEffect(() => {
        setSearchParams(searchParams)
        onCategoryChange(activeItem)
    }, [mailId])

    const itemsMap = [
        { key: 'inbox' },
        { key: 'star' },
        { key: 'sent' },
        { key: 'draft' },
        { key: 'trash' },
    ]

    return (
        <section className={`${isMenuOpen ? 'open-' : 'closed'} mail-menu aside flex column`}>

            <button onClick={() => onOpenModal()} className="menu-btn compose">
                <i title="compose" className="icon outlined compose active" />
                <span className="item-name">Compose</span>
            </button>

            {itemsMap.map(item => {
                const isActive = activeItem === item.key
                const count = categoryCounts[item.key]


                return isActive ?
                    (<button key={item.key} className="menu-btn active"
                        onClick={() => {
                            onCategoryChange(item.key)
                            setActiveItem(item.key)
                        }}
                    >
                        <img
                            onClick={() => {
                                onCategoryChange(item.key)
                                setActiveItem(item.key)
                            }}
                            title={item.key}
                            className={`m-${item.key} active`}
                            src={`assets/icons/m-${item.key}.svg`} />
                        <span className="flex space-between">
                            <span className="item-name">{item.key}</span>
                            <span className="item-count">{count}</span>
                        </span>
                    </button>)
                    : (<button key={item.key} className="menu-btn"
                        onClick={() => {
                            onCategoryChange(item.key)
                            setActiveItem(item.key)
                        }}
                    >
                        <i title={item.key}
                            className={`icon outlined ${item.key}`}
                            onClick={() => {
                                onCategoryChange(item.key)
                                setActiveItem(item.key)
                            }} />
                        <span className="flex space-between">
                            <span className="item-name">{item.key}</span>
                            <span className="item-count">{count}</span>
                        </span>
                    </button>)
            })}
        </section>
    )
}
