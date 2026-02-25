import { Bell } from 'lucide-react'
import React from 'react'

const NotificationsSection = () => {
  return (
         <section className="bg-white rounded-md shadow-md p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Bell />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked />
            Email notifications for successful posts
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" />
            Notify on failed posts
          </label>
        </div>
      </section>
  )
}

export default NotificationsSection