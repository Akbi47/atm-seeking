import './globals.css'
import Provider from './Provider'
import { Header } from "@/components";
import UserLocation from './UserLocation';
import SelectedBusiness from './SelectedBusiness';
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata = {
  title: 'ATM Seeking',
  description: 'Seeking the ATM near you',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Provider>
          <SelectedBusiness>
            <UserLocation>
              <Header />
              {children}
            </UserLocation>
          </SelectedBusiness>
        </Provider>
      </body>
    </html>
  )

}
