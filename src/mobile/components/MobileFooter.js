import React from 'react'
import styles from './css/footer.module.css'

export default function MobileFooter() {
  return (
    <div id={styles.footer_wrap}>
      <footer>
        <p id={styles.copy_right}>
          Copyright © 2023 LoveSilver. All Rights Reserved
        </p>
      </footer>
    </div>
  )
}
