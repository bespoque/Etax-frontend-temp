import { UnderlinedTabs } from '../../components/tabs'
import SectionTitle from '../../components/section-title'
import {
  Intro,
  Instructions,
  TemplateStructure
} from '../../components/viewannualdocs/installation'
import {
  CodeStructure,
  NamingConventions,
  Folders,
  Files
} from '../../components/viewannualdocs/code-structure'
import { Customization } from '../../components/viewannualdocs/faq'
import { Credits } from '../../components/viewannualdocs/credits'
import { ChangeLog, ViewDocs, ViewDocs20, ViewDocsYr2, ViewDocsYr3, ViewDocsYr4 } from '../../components/viewannualdocs/view-annual-doc'
import { Tree } from '../../components/viewannualdocs/tree'

const InstallationTab = () => (
  <div className="w-full">
    <Intro />
    <Instructions />
    <TemplateStructure />
  </div>
)

const CodeStructureTab = () => (
  <div className="w-full">
    <CodeStructure />
    <NamingConventions />
    <Folders />
    <Files />
    <Tree />
  </div>
)

const FaqTab = () => (
  <div className="w-full">
    <Customization />
  </div>
)

const CreditsTab = () => (
  <div className="w-full">
    <Credits />
  </div>
)

const Year1Docs = () => (
  <div className="w-full">
    <ViewDocs />
  </div>
)

const Year2Docs = () => (
  <div className="w-full">
    <ViewDocsYr2 />
  </div>
)

const Year3Docs = () => (
  <div className="w-full">
    <ViewDocsYr3 />
  </div>
)

const Year4Docs = () => (
  <div className="w-full">
    <ViewDocsYr4 />
  </div>
)

const Index = () => {
  const tabs = [
    // {index: 0, title: '2017', content: <InstallationTab />},
    { index: 0, title: '2022', content: <Year1Docs /> },
    { index: 1, title: '2021', content: <Year2Docs /> },
    { index: 2, title: '2020', content: <Year3Docs /> },
    { index: 3, title: '2019', content: <Year4Docs /> }
  ]
  return (
    <>
      <SectionTitle title="" subtitle="View uploaded documents" />
      <div className="flex ">
        <div className="w-full">
          <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </>
  )
}
export default Index
