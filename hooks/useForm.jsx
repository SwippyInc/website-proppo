import { useState, useCallback } from "react"
import ResponsiveDialog, { GetDemoForm, GetStartedForm, GetCBForm } from "@/components/Forms"

export function useSignUpForm() {
  const [isVisible, setIsVisible] = useState(false)

  const renderSUForm = useCallback(() => {
    setIsVisible(true)
  }, [])

  const hideSUForm = useCallback(() => {
    setIsVisible(false)
  }, [])

  const formComponent = isVisible ? (
    <ResponsiveDialog hideFun={hideSUForm}>
      <GetStartedForm />
    </ResponsiveDialog>
  ) : null

  return { renderSUForm, formComponent }
}

export function useDemoForm() {
  const [isVisible, setIsVisible] = useState(false)

  const renderDemoForm = useCallback(() => {
    setIsVisible(true)
  }, [])

  const hideSUForm = useCallback(() => {
    setIsVisible(false)
  }, [])

  const formComponent = isVisible ? (
    <ResponsiveDialog hideFun={hideSUForm}>
      <GetDemoForm />
    </ResponsiveDialog>
  ) : null

  return { renderDemoForm, formComponent }
}

export function useBookCallForm(){
    const [isVisible,setIsVisible] = useState(false)
    function renderCBForm(){
        setIsVisible(true)
    }
    function hideFun(){
        setIsVisible(false)
    }
    const CBFComp = isVisible ? (
        <ResponsiveDialog hideFun={hideFun}>
          <GetCBForm />
        </ResponsiveDialog>
    ) : null

    return {renderCBForm,CBFComp}
}
