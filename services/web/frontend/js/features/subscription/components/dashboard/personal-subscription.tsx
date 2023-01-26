import { useTranslation } from 'react-i18next'
import { Subscription } from '../../../../../../types/subscription/dashboard/subscription'
import { ActiveSubsciption } from './states/active'
import { CanceledSubsciption } from './states/canceled'
import { ExpiredSubsciption } from './states/expired'

function PastDueSubscriptionAlert({
  subscription,
}: {
  subscription: Subscription
}) {
  const { t } = useTranslation()
  return (
    <>
      <div className="alert alert-danger" role="alert">
        {t('account_has_past_due_invoice_change_plan_warning')}{' '}
        <a
          href={subscription.recurly.accountManagementLink}
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('view_your_invoices')}
        </a>
      </div>
    </>
  )
}

function PersonalSubscriptionStates({
  subscription,
  state,
}: {
  subscription: Subscription
  state?: string
}) {
  const { t } = useTranslation()

  if (state === 'active') {
    return <ActiveSubsciption subscription={subscription} />
  } else if (state === 'canceled') {
    return <CanceledSubsciption subscription={subscription} />
  } else if (state === 'expired') {
    return <ExpiredSubsciption subscription={subscription} />
  } else {
    return <>{t('problem_with_subscription_contact_us')}</>
  }
}

function PersonalSubscription({
  subscription,
}: {
  subscription?: Subscription
}) {
  const state = subscription?.recurly?.state

  if (!subscription) return <></>

  return (
    <>
      {subscription.recurly.account.has_past_due_invoice._ === 'true' && (
        <PastDueSubscriptionAlert subscription={subscription} />
      )}
      <PersonalSubscriptionStates subscription={subscription} state={state} />
    </>
  )
}

export default PersonalSubscription
