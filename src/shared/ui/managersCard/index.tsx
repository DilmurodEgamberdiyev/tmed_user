'use client'
import { Accordion, AccordionDetails, AccordionSummary, Grid } from '@mui/material'
import Image from 'next/image'
import sx from '../administrationsCard/administration.module.scss'
import { FC, SyntheticEvent, useState } from 'react'
import { Icon, Manager } from '@/shared'
import parse from 'html-react-parser'
import { AdminEnum } from '@/entities'
import { useTranslations } from 'next-intl'

type ManagerProps = Manager & {
  editManager?: () => void
  deleteManager?: () => void
  type?: AdminEnum
}

export const ManagersCard: FC<ManagerProps> = ({
  id,
  image,
  name,
  phoneNumber,
  admissionDay,
  jobTitle,
  staj,
  permission,
  editManager,
  deleteManager,
  type,
}) => {
  const t = useTranslations('Main')
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Grid style={{ flex: 1 }} className={sx.card + ' ' + sx.fullCard} item xs={12}>
      <Image src={image} alt='T MED' width={0} height={0} className={sx.image} />
      <div className={sx.wrapper}>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'end',
          }}>
          {/* {editManager && <button onClick={() => editManager()}>Edit</button>} */}
          {deleteManager && (
            <button className='button' onClick={() => deleteManager()}>
              <Icon.DeleteIcon />
            </button>
          )}
        </div>
        {type && <p>Type: {type}</p>}
        <p className={sx.head}>{jobTitle}</p>
        <p className={sx.name}>{name}</p>
        <p className={sx.head}>{t('phone')}:</p>
        <a className={sx.a} href={`tel: ${phoneNumber}`}>
          {phoneNumber}
        </a>
        <p className={sx.gray}>{t('receptionDays')}:</p>
        <p className={sx.a}>{admissionDay}</p>

        {staj ? (
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<Icon.ArrowDown />} aria-controls='panel1bh-content' id='panel1bh-header'>
              <p>{t('experience')}</p>
            </AccordionSummary>
            <AccordionDetails>
              <p>{parse(String(staj))}</p>
            </AccordionDetails>
          </Accordion>
        ) : (
          ''
        )}

        {permission ? (
          <div>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary expandIcon={<Icon.ArrowDown />} aria-controls='panel1bh-content' id='panel1bh-header'>
                <p>{t('jobResponsibilities')}</p>
              </AccordionSummary>
              <AccordionDetails>
                <p>{parse(String(permission))}</p>
              </AccordionDetails>
            </Accordion>
          </div>
        ) : (
          ''
        )}
      </div>
    </Grid>
  )
}
