import { Link } from 'react-router-dom'
import { FaDribbble, FaFacebook, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='pt-10 pb-10 mt-3 place-footer'>
        <div className='w-[90%] mx-auto items-start grid-cols-2 sm:grid-cols-2 grid md:grid-cols-2 lg:grid-cols-4 gap-10'>
            {/* 1ère partie - Entreprise */}
            <div className='space-y-5'>
                <h1 className='text-lg font-bold'>Entreprise</h1>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    À propos de nous
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Carrières
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Blog
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Cartes cadeaux
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Magazine
                </p>
            </div>
            
            {/* 2ème partie - Support */}
            <div className='space-y-5'>
                <h1 className='text-lg font-bold'>Support</h1>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Contact
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Mentions légales
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Politique de confidentialité
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Conditions générales
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Plan du site
                </p>
            </div>
            
            {/* 3ème partie - Autres services */}
            <div className='space-y-5'>
                <h1 className='text-lg font-bold'>Autres services</h1>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Location de voiture
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Recherche d'activités
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Liste des tours
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Recherche de vols
                </p>
                <p className='text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950'>
                    Agents de voyage
                </p>
            </div>
            
            {/* 4ème partie - Contact */}
            <div>
                <h1 className='text-lg font-bold'>Contactez-nous</h1>
                <div className='mt-6'>
                    <h1 className='h text-sm text-gray-600'>Notre numéro mobile</h1>
                    <h1 className='hh text-base font-bold text-blue-950 mt-1'>+261 34 00 000 00</h1>
                </div>
                <div className='mt-6'>
                    <h1 className='h text-sm text-gray-600'>Notre adresse email</h1>
                    <h1 className='hh text-base font-bold text-blue-950 mt-1'>fid@gmail.com</h1>
                </div>
            </div>
        </div>
        
        {/* Section inférieure */}
        <div className='mt-8 w-[90%] mx-auto border-t pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm'>
            <p className='text-center md:text-left'>
                Copyright © 2025 FONDS D'INTERVENTION POUR LE DÉVELOPPEMENT. Tous droits réservés.
            </p>
            <p className='flex items-center space-x-4 mt-1 -pt-10 md:mt-0'>
                <span>Réseaux sociaux : </span>
                <Link to="#" className='text-gray-500 hover:text-gray-800'>
                    <FaFacebook />
                </Link>
                <Link to="#" className='text-gray-500 hover:text-gray-800'>
                    <FaTwitter />
                </Link>
                <Link to="#" className='text-gray-500 hover:text-gray-800'>
                    <FaDribbble />
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Footer