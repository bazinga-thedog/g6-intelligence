import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import ConversionModal from './ConversionModal'
import './InvestmentDetails.css'

export default function InvestmentDetails() {
  const { cityName, neighborhoodName } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const neighborhood = location.state?.neighborhood
  const city = location.state?.city

  const [activePhase, setActivePhase] = useState(null)
  const [activeSubStep, setActiveSubStep] = useState(null)
  const [closingSubStep, setClosingSubStep] = useState(null)
  const [showConversionModal, setShowConversionModal] = useState(false)
  const [modalContext, setModalContext] = useState(null)
  const [expandedActivities, setExpandedActivities] = useState({})

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Investment lifecycle roadmap data
  const roadmapData = {
    acquisition: {
      title: 'Acquisition',
      icon: 'search',
      description: 'Find, validate, and purchase your investment property',
      color: '#10b981',
      subSteps: [
        {
          id: 'sourcing',
          title: 'Sourcing',
          description: 'Identify and evaluate potential properties',
          activities: [
            {
              title: 'Property Search',
              description: 'Browse available properties using trusted online real estate portals, work with renowned local real estate agents, or explore off-market opportunities through direct outreach. Define your criteria upfront: neighborhood, property type (apartment, villa), size, budget range, and desired rental yield. You can do this independently using listing websites, but working with verified local agents familiar with the neighborhood can provide access to properties before they are publicly listed and offer insights on pricing trends. Consider viewing 5-10 properties to understand the market before making decisions.',
              cta: {
                text: 'Help me find verified brokers',
                type: 'lead_gen',
                service: 'broker_connection'
              }
            }
          ]
        },
        {
          id: 'validate',
          title: 'Validation',
          description: 'Conduct thorough due diligence',
          activitiesParallel: [
            {
              title: 'Technical Due Diligence',
              description: 'Hire a licensed surveyor or engineer to inspect the property\'s physical condition. They will assess structural integrity, roof condition, plumbing and electrical systems, HVAC functionality, and identify any defects or required repairs. The inspection should verify building code compliance and evaluate the overall maintenance state. Request a detailed written report with photographs and cost estimates for any remediation work. This protects you from unexpected repair costs and provides negotiation leverage if significant issues are discovered.',
              cta: {
                text: 'Help me find verified surveyors',
                type: 'lead_gen',
                service: 'surveyor_connection'
              }
            },
            {
              title: 'Legal Due Diligence',
              description: 'Engage a Portuguese real estate attorney to conduct comprehensive legal verification. They will confirm clean title ownership through land registry checks, verify there are no liens, mortgages, or legal disputes attached to the property, validate all building permits and licenses are in order, and confirm zoning compliance for your intended use. The lawyer should also review the property\'s cadastral registration and ensure the seller has legal authority to sell. This due diligence prevents future legal complications and ensures you receive legitimate ownership.',
              cta: {
                text: 'Help me find verified lawyers',
                type: 'lead_gen',
                service: 'lawyer_connection'
              }
            },
            {
              title: 'Tax Advisory',
              description: 'Consult with a tax advisor who specializes in Portuguese real estate and cross-border taxation. They will analyze your specific situation to determine the most tax-efficient ownership structure (personal name, company, trust), explain IMT transfer tax rates and exemptions applicable to your purchase, calculate ongoing obligations like IMI property tax and rental income tax, and identify available deductions or incentives. Understanding the tax implications upfront helps you optimize your investment structure and avoid costly surprises. Consider advisors familiar with tax treaties between Portugal and your home country.',
              cta: {
                text: 'Help me find verified tax advisors',
                type: 'lead_gen',
                service: 'tax_advisor_connection'
              }
            }
          ],
          activitiesSequential: [
            {
              title: 'Valuation',
              description: 'Commission an independent professional appraisal after completing all due diligence activities. A certified appraiser will assess the property\'s fair market value based on recent comparable sales, current condition (incorporating technical inspection findings), location characteristics, and market trends. The valuation report is essential for mortgage applications, price negotiation validation, and confirming you\'re paying a fair price. Banks typically require this for loan approval. Compare the appraised value against your negotiated price, significant discrepancies may warrant renegotiation or reconsidering the purchase.',
              cta: {
                text: 'Help me find verified appraisers',
                type: 'lead_gen',
                service: 'appraiser_connection'
              }
            }
          ]
        },
        {
          id: 'contract',
          title: 'Contract',
          description: 'Negotiate and formalize the purchase with legal support',
          activities: [
            {
              title: 'Offer & Negotiation',
              description: 'Work with your lawyer to submit a formal written offer to the seller. Your attorney will help negotiate the purchase price, payment terms, closing timeline, and any contingencies such as financing approval or successful completion of due diligence. The lawyer ensures all negotiated terms are clearly documented and legally binding. They will also advise on standard market practices in Portugal and protect your interests throughout the negotiation process. Never proceed without legal representation at this stage.',
              cta: {
                text: 'Help me find verified lawyers',
                type: 'lead_gen',
                service: 'lawyer_connection'
              }
            },
            {
              title: 'CPCV (Promissory Contract)',
              description: 'Your lawyer will draft or review the CPCV (Contrato de Promessa de Compra e Venda), the preliminary purchase agreement that commits both parties to the sale. This legally binding document outlines the final price, deposit amount (typically 10-30% of purchase price), completion date, and conditions. The lawyer verifies all terms match your negotiated agreement, protects you with appropriate clauses, and ensures the contract complies with Portuguese law. You will pay the deposit at signing, which is held in escrow. Your lawyer\'s involvement here is mandatory to protect your deposit and rights.',
              cta: {
                text: 'Help me find verified lawyers',
                type: 'lead_gen',
                service: 'lawyer_connection'
              }
            },
            {
              title: 'Final Contract Review',
              description: 'Before the signing ceremony, your lawyer will conduct a comprehensive review of the final deed (escritura pública). They will verify all terms from the CPCV are correctly reflected, confirm there are no last-minute changes or hidden clauses, ensure all taxes and fees are accurately calculated, and validate that ownership will transfer cleanly. The lawyer checks final land registry entries one more time to confirm nothing has changed since due diligence. This final review is your last protection before committing to the purchase. Do not proceed to signing without your lawyer\'s explicit approval.',
              cta: {
                text: 'Help me find verified lawyers',
                type: 'lead_gen',
                service: 'lawyer_connection'
              }
            }
          ]
        },
        {
          id: 'close',
          title: 'Close',
          description: 'Complete the purchase transaction and finalize ownership',
          stages: [
            {
              type: 'parallel',
              label: 'Complete before signing',
              activities: [
                {
                  title: 'Pay Transfer Tax (IMT)',
                  description: 'Calculate and pay the IMT (Imposto Municipal sobre Transmissões), Portugal\'s property transfer tax, before the deed signing. The tax rate varies based on property type, location, and value, ranging from 0% to 8% for urban properties. Your lawyer or tax advisor will calculate the exact amount owed. Properties under certain thresholds may qualify for reduced rates or exemptions, particularly for permanent residence or properties in certain municipalities. Payment must be completed and proof provided to the notary before the escritura can proceed. This is a mandatory government tax separate from your purchase price.',
                  cta: {
                    text: 'Help me find verified tax advisors',
                    type: 'lead_gen',
                    service: 'tax_advisor_connection'
                  }
                },
                {
                  title: 'Pay Stamp Duty',
                  description: 'Pay the stamp duty (Imposto de Selo) of 0.8% on the property\'s purchase price or fiscal value, whichever is higher. This is a standard transaction tax in Portugal required for all property purchases. Your lawyer will calculate the exact amount and ensure payment is completed before the notary appointment. The stamp duty covers the legal documentation and registration process. Proof of payment must be presented at the deed signing. This is a non-negotiable government fee that must be paid in addition to the IMT transfer tax.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                }
              ]
            },
            {
              type: 'sequential',
              label: 'Signing ceremony',
              activities: [
                {
                  title: 'Sign Deed (Escritura)',
                  description: 'Attend the notary office to sign the final deed (escritura pública) in the presence of a licensed notary public. Both buyer and seller (or their legal representatives with power of attorney) must be present. The notary will read through the deed, verify all parties\' identities, confirm all taxes have been paid, and witness the signing. At this moment, legal ownership officially transfers from seller to buyer. You will pay the remaining balance of the purchase price (minus the deposit already paid). The notary will provide certified copies of the signed deed. Your lawyer should accompany you to ensure everything proceeds correctly.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                }
              ]
            },
            {
              type: 'parallel',
              label: 'After signing',
              activities: [
                {
                  title: 'Register Property',
                  description: 'Your lawyer will register the new ownership with the Conservatória do Registo Predial (Land Registry Office). This official registration updates public records to reflect you as the legal owner and protects your ownership rights against future claims. The registration includes recording any mortgages or liens associated with the property. While ownership transfers at the notary, registration provides full legal protection and is required for selling or mortgaging the property in the future. Your lawyer will obtain the updated title deed (caderneta predial) showing you as the registered owner. Keep this document safe as proof of ownership.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                },
                {
                  title: 'Set Up Utilities',
                  description: 'Transfer or activate essential utility services in your name including electricity, water, gas, internet, and waste collection. Contact each utility provider with your deed and identification to set up accounts. Some utilities may require meter readings or physical inspection before activation. Ensure you understand billing cycles and payment methods for each service. If the property is part of a condominium, coordinate with the HOA regarding any shared utilities or services. Setting up utilities promptly ensures the property is functional for renovation work, tenant move-in, or your own use. Your property manager or lawyer can often assist with coordinating these connections.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    hold: {
      title: 'Hold',
      icon: 'home',
      description: 'Manage, maintain, and optimize your investment',
      color: '#3b82f6',
      subSteps: [
        {
          id: 'setup',
          title: 'Setup',
          description: 'Prepare property for rental or use',
          stages: [
            {
              type: 'sequential',
              label: 'Prepare the property',
              activities: [
                {
                  title: 'Property Refurbishment',
                  description: 'Assess the property\'s condition and complete necessary renovations to make it rental-ready or suitable for your use. This may include repainting walls, updating fixtures, repairing plumbing or electrical issues, replacing flooring, modernizing the kitchen or bathrooms, and addressing any items flagged during the technical inspection. Prioritize repairs that affect safety, functionality, and tenant appeal. Obtain quotes from licensed contractors, ensure proper permits are secured for major work, and maintain records of all improvements for tax purposes. Quality refurbishment increases rental value and reduces future maintenance costs. Budget 5-15% of the purchase price for standard renovations.',
                  cta: {
                    text: 'Help me find verified contractors',
                    type: 'lead_gen',
                    service: 'contractor_connection'
                  }
                }
              ]
            },
            {
              type: 'parallel',
              label: 'Complete administrative setup',
              activities: [
                {
                  title: 'Furnishing (if applicable)',
                  description: 'If offering a furnished rental, purchase and install furniture, appliances, kitchenware, linens, and décor. Focus on durable, neutral-style pieces that appeal to a broad tenant base and withstand regular use. Essential items typically include beds, sofas, dining table, wardrobe, washing machine, refrigerator, cookware, and basic electronics. Source from local furniture stores or wholesalers to stay within budget. Keep receipts for tax deductions. Furnished properties command 10-30% higher rent but require ongoing replacement and maintenance. Consider your target tenant demographic when selecting furnishing quality and style.',
                  cta: {
                    text: 'Help me find verified furniture suppliers',
                    type: 'lead_gen',
                    service: 'furniture_supplier_connection'
                  }
                },
                {
                  title: 'Insurance Setup',
                  description: 'Secure comprehensive property and liability insurance to protect your investment. Standard landlord insurance should cover building structure, your contents (if furnished), loss of rental income, public liability, and legal expenses. Compare quotes from multiple Portuguese insurers and understand coverage limits, exclusions, and excess amounts. Ensure the policy covers rental activity specifically, as standard home insurance may not. If the property is in a condominium, verify what the HOA master policy covers to avoid duplicate coverage. Annual premiums typically range from 0.1-0.3% of property value. Maintain continuous coverage as mortgage lenders and responsible investment practice require it.',
                  cta: {
                    text: 'Help me find verified insurance brokers',
                    type: 'lead_gen',
                    service: 'insurance_broker_connection'
                  }
                },
                {
                  title: 'HOA Registration',
                  description: 'If your property is part of a condominium or homeowners association, formally register as the new owner with the HOA board. Provide copies of your deed, contact information, and any required documentation. Understand the HOA rules (regulamento), monthly or quarterly fees, what communal services are covered (security, cleaning, garden maintenance, elevator), and procedures for requesting maintenance or making complaints. Attend the annual general meeting to stay informed and vote on building matters. Review the HOA\'s financial health and reserve fund status. Failure to pay HOA fees can result in liens on your property, so set up automatic payments if possible.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                },
                {
                  title: 'Tax Registration',
                  description: 'Register with the Portuguese tax authority (Autoridade Tributária e Aduaneira) to declare your intention to earn rental income. Obtain a tax identification number (NIF) if you don\'t already have one, and activate it for rental income purposes. Determine your tax regime: the simplified regime (typically 28% flat rate on rental income) or itemized deductions regime if your expenses exceed standard allowances. Understand your quarterly or annual tax filing obligations. If you\'re a non-resident, ensure proper tax withholding procedures are in place. Consult a tax advisor to optimize your structure and ensure compliance. Proper registration from the start avoids penalties and legal complications.',
                  cta: {
                    text: 'Help me find verified tax advisors',
                    type: 'lead_gen',
                    service: 'tax_advisor_connection'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'rent',
          title: 'Rent',
          description: 'Find tenants and generate income',
          stages: [
            {
              type: 'sequential',
              label: 'Find tenants',
              activities: [
                {
                  title: 'Marketing Property',
                  description: 'Create an attractive listing to market your rental property. Hire a professional photographer to capture high-quality images showcasing the property\'s best features, including all rooms, outdoor spaces, and neighborhood amenities. Write a compelling description highlighting location benefits, transport links, nearby schools or businesses, recent upgrades, and included amenities. List the property on major Portuguese portals like Idealista, Imovirtual, and OLX, as well as international platforms if targeting expats. Set a competitive rental price based on comparable properties in your area. Respond promptly to inquiries and schedule viewings efficiently. Good marketing reduces vacancy time and attracts quality tenants.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                },
                {
                  title: 'Tenant Screening',
                  description: 'Thoroughly vet potential tenants to minimize risk and ensure reliable rental income. Request applications including employment details, previous rental history, references from prior landlords, and proof of income (payslips or tax returns showing income at least 3x the monthly rent). Conduct reference checks by contacting previous landlords and employers directly. For employed tenants, verify employment status and salary. For self-employed or freelance applicants, request additional documentation like bank statements or accountant letters. Check for any red flags such as frequent address changes, poor references, or evasive answers. Portuguese law protects tenants strongly, so selecting reliable tenants upfront is critical. Consider using a property management company if you lack local knowledge or language skills.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                }
              ]
            },
            {
              type: 'sequential',
              label: 'Finalize rental',
              activities: [
                {
                  title: 'Lease Agreement',
                  description: 'Draft a comprehensive rental contract (contrato de arrendamento) compliant with Portuguese tenancy law. The agreement should specify monthly rent amount, payment due date, lease duration (fixed-term or indefinite), notice periods for both parties, deposit amount, who pays utilities, maintenance responsibilities, subletting restrictions, and conditions for rent increases. Include an inventory list of furnishings and fittings if applicable. Portuguese law mandates certain tenant protections, so ensure your contract doesn\'t include illegal clauses that could be unenforceable. Have the contract reviewed by a lawyer experienced in Portuguese rental law. Both parties should sign and date the agreement, and each should retain an original copy. Register the lease with the tax authority within 15 days of signing.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                },
                {
                  title: 'Deposit Collection',
                  description: 'Collect a security deposit (caução) from the tenant, typically equivalent to 1-3 months\' rent depending on lease terms and whether the property is furnished. The deposit protects you against unpaid rent, damage beyond normal wear and tear, or other lease violations. Portuguese law limits deposits to a maximum of 2 months\' rent for unfurnished properties and 3 months for furnished properties. Issue a signed receipt confirming the deposit amount and date received. Hold the deposit in a separate account and do not use it as rental income. At lease end, inspect the property and return the deposit within a reasonable timeframe (typically 30-60 days), deducting only for legitimate damages or unpaid obligations with itemized proof. Proper deposit handling avoids legal disputes.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                },
                {
                  title: 'Handover & Inventory',
                  description: 'Conduct a detailed move-in inspection with the tenant present. Walk through the entire property together, documenting its condition room by room with photographs and written notes. Record the state of walls, floors, fixtures, appliances, furniture (if furnished), and any existing damage or wear. Check that all utilities are functional, keys are provided, and meter readings are noted. Complete a formal inventory list detailing all items included in the rental, especially for furnished properties. Both landlord and tenant should sign and date the inspection report and inventory, each keeping a copy. This document is critical evidence if disputes arise over deposit deductions at lease end. Schedule the handover for the lease start date, hand over all keys, provide instructions for appliances and heating systems, and ensure the tenant has emergency contact information.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'maintain',
          title: 'Maintain',
          description: 'Ongoing property upkeep and management',
          stages: [
            {
              type: 'parallel',
              label: 'Ongoing responsibilities',
              activities: [
                {
                  title: 'Regular Maintenance',
                  description: 'Establish a proactive maintenance schedule to preserve property value and tenant satisfaction. Arrange annual servicing for HVAC systems, boilers, and water heaters to ensure efficient operation and prevent breakdowns. Inspect and clean gutters, check for leaks or dampness, test smoke and carbon monoxide detectors, and address minor repairs promptly before they escalate into costly problems. For rented properties, respond to tenant maintenance requests within legally required timeframes (urgent issues like heating or water within 24 hours, non-urgent within a few days). Keep detailed records of all maintenance work, invoices, and contractor contacts. Budget approximately 1-2% of property value annually for routine maintenance. Consider hiring a property manager or local handyman for ongoing oversight if you live abroad.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                },
                {
                  title: 'Tenant Relations',
                  description: 'Maintain positive, professional communication with your tenants throughout the lease term. Provide a clear point of contact for questions, concerns, or maintenance issues. Respond promptly and professionally to all tenant communications, even if a full resolution takes time. Conduct periodic property inspections (with proper notice as required by law, typically 24-48 hours) to check for maintenance needs or lease violations. Address tenant complaints or disputes fairly and document all interactions. As the lease expiration approaches, discuss renewal options well in advance. If renewing, prepare updated lease terms including any rent adjustments in line with legal limits. Good tenant relationships reduce vacancy, encourage lease renewals, minimize conflicts, and protect your reputation as a landlord.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                },
                {
                  title: 'HOA Fees',
                  description: 'Pay your homeowners association or condominium fees on time, typically monthly or quarterly depending on your building\'s structure. These fees cover shared building expenses such as elevator maintenance, common area cleaning, garden upkeep, building insurance, security, water for common areas, and reserve fund contributions for major repairs. The HOA will send you invoices or payment schedules. Set up automatic bank transfers to avoid late payments, which can result in penalties, interest charges, or even legal action and property liens. Keep records of all payments. Review the annual HOA budget and financial statements to understand how fees are allocated and whether increases are justified. If fees seem excessive or mismanaged, attend HOA meetings and raise concerns with the board or other owners.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                },
                {
                  title: 'Property Tax (IMI)',
                  description: 'Pay the annual IMI (Imposto Municipal sobre Imóveis), Portugal\'s municipal property tax, by the deadline to avoid penalties and interest. The tax rate typically ranges from 0.3-0.45% of the property\'s fiscal value (valor patrimonial tributário) depending on the municipality and property type. The tax authority will send you a payment notice (nota de liquidação) indicating the amount due and payment deadline, usually in spring or split into installments if above a certain threshold. Pay online through the tax portal, at ATM machines, or at post offices or banks. Keep proof of payment for your records and tax filings. The fiscal value is reassessed periodically and after major renovations, which may increase your IMI liability. Budget for this annual expense when calculating your net rental yield.',
                  cta: {
                    text: 'Help me find verified tax advisors',
                    type: 'lead_gen',
                    service: 'tax_advisor_connection'
                  }
                },
                {
                  title: 'Income Tax Returns',
                  description: 'Declare your rental income and file annual tax returns with the Portuguese tax authority by the deadline (typically April-June for the prior tax year). Report all rental income received during the year and claim eligible deductions such as IMI, HOA fees, insurance, maintenance, repairs, property management fees, mortgage interest, and depreciation. Choose between the simplified regime (flat tax rate with standard deductions) or the itemized regime (actual expenses) depending on which is more favorable. Non-resident landlords may have different filing obligations and withholding requirements. Maintain organized records of all income and expenses throughout the year to support your tax return. Consider hiring an accountant experienced in Portuguese rental property taxation to ensure compliance, optimize deductions, and avoid errors that could trigger audits or penalties.',
                  cta: {
                    text: 'Help me find verified tax advisors',
                    type: 'lead_gen',
                    service: 'tax_advisor_connection'
                  }
                },
                {
                  title: 'Insurance Renewal',
                  description: 'Review and renew your landlord insurance policy annually before it expires to maintain continuous coverage. As renewal approaches, reassess your coverage needs based on any property improvements, changes in rental status, or updated property values. Compare quotes from multiple insurers to ensure you\'re getting competitive rates and adequate coverage. Check that the policy still covers building structure, contents (if furnished), loss of rental income, public liability, legal expenses, and any other relevant risks. Update the insurer about any material changes to the property or its use. Negotiate premium reductions if you\'ve made security upgrades, installed safety features, or maintained a claims-free record. Never let coverage lapse, as even a short gap can void future claims or violate mortgage requirements. Keep copies of all policy documents and renewal confirmations.',
                  cta: {
                    text: 'Help me find verified insurance brokers',
                    type: 'lead_gen',
                    service: 'insurance_broker_connection'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'optimize',
          title: 'Optimize',
          description: 'Maximize returns and property value',
          stages: [
            {
              type: 'parallel',
              label: 'Optimization activities',
              activities: [
                {
                  title: 'Rent Review',
                  description: 'Conduct an annual rent review to ensure your rental income keeps pace with market conditions and inflation. Research comparable properties in your neighborhood using rental portals, speaking with local agents, or analyzing recent listings to determine current market rates for similar properties. Portuguese law regulates rent increases for existing tenants, typically limiting annual increases to inflation rates or specific percentages depending on lease type and tenant protections. For lease renewals or new tenants, you have more flexibility to adjust to market rates. When proposing a rent increase, provide proper notice as required by law and justify the increase based on market data, property improvements, or increased costs. Balance maximizing income with retaining good tenants, as turnover costs (vacancy, marketing, refurbishment) can exceed the benefit of aggressive rent increases. Document all rent adjustments in writing.',
                  cta: {
                    text: 'Help me find verified property managers',
                    type: 'lead_gen',
                    service: 'property_manager_connection'
                  }
                },
                {
                  title: 'Value-Add Improvements',
                  description: 'Identify and execute strategic property upgrades that increase rental income, property value, or tenant appeal beyond their cost. Focus on high-return improvements such as modernizing kitchens or bathrooms, adding air conditioning, upgrading flooring, improving energy efficiency (double-glazed windows, insulation, solar panels), adding storage, or enhancing outdoor spaces. Before investing, calculate the expected return through increased rent or property value appreciation. Prioritize improvements that align with your target tenant demographic and competitive positioning. Obtain proper permits for significant renovations and retain all receipts for tax deductions and future sale documentation. Time major improvements during vacancy periods to avoid disrupting tenants. Quality improvements also reduce maintenance costs, attract better tenants, and differentiate your property in competitive markets.',
                  cta: {
                    text: 'Help me find verified contractors',
                    type: 'lead_gen',
                    service: 'contractor_connection'
                  }
                },
                {
                  title: 'Expense Optimization',
                  description: 'Regularly review and reduce your property operating expenses to maximize net rental yield without compromising property quality or tenant satisfaction. Analyze quarterly or annual expense reports to identify cost-saving opportunities. Renegotiate insurance premiums, shop for better HOA service contracts, switch to more efficient utility providers if allowed, contest excessive property tax assessments, refinance your mortgage if interest rates have dropped, consolidate maintenance contracts, or switch to energy-efficient appliances and lighting to reduce utility costs. Evaluate whether your property management fees justify the service provided or if you could self-manage or switch providers. Track expense ratios (operating costs as a percentage of rental income) and benchmark against similar properties. Small recurring savings compound significantly over years of ownership.',
                  cta: {
                    text: 'Help me find verified financial advisors',
                    type: 'lead_gen',
                    service: 'financial_advisor_connection'
                  }
                },
                {
                  title: 'Portfolio Rebalancing',
                  description: 'Annually assess whether this property still aligns with your overall investment strategy, risk tolerance, and financial goals. Evaluate current performance metrics including rental yield, capital appreciation, vacancy rates, maintenance costs, and total return compared to your original projections and alternative investments. Consider external factors such as neighborhood trajectory, local economic conditions, regulatory changes affecting landlords, or shifts in tenant demand. Assess your personal circumstances: has your risk appetite changed, do you need liquidity, are you approaching retirement, or do you want to diversify geographically? If the property underperforms or no longer fits your strategy, consider selling and reallocating capital to better opportunities. If it performs well, consider leveraging equity for additional investments. Regular rebalancing ensures your portfolio remains optimized and responsive to changing conditions.',
                  cta: {
                    text: 'Help me find verified financial advisors',
                    type: 'lead_gen',
                    service: 'financial_advisor_connection'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    sell: {
      title: 'Sell',
      icon: 'trending-up',
      description: 'Exit your investment and realize gains',
      color: '#f59e0b',
      subSteps: [
        {
          id: 'prepare',
          title: 'Prepare',
          description: 'Get property ready for market',
          stages: [
            {
              type: 'parallel',
              label: 'Preparation activities',
              activities: [
                {
                  title: 'Market Timing Analysis',
                  description: 'Analyze current real estate market conditions to determine the optimal time to sell and maximize your return. Review recent comparable sales in your neighborhood, assess average days on market, track price trends over the past 6-12 months, and monitor economic indicators affecting property demand. Consider seasonal factors, as spring and early summer typically see higher buyer activity in Portugal. Evaluate whether market conditions favor sellers (low inventory, high demand) or buyers (high inventory, slower sales). Consult with local real estate agents who understand micro-market dynamics in your specific area. If market conditions are unfavorable and you have flexibility on timing, consider waiting for a better selling window. Factor in your personal circumstances, holding costs, and opportunity cost of capital when making the final decision.',
                  cta: {
                    text: 'Help me find verified brokers',
                    type: 'lead_gen',
                    service: 'broker_connection'
                  }
                },
                {
                  title: 'Property Staging',
                  description: 'Prepare your property to make the best possible impression on potential buyers and maximize sale price. Start by decluttering and depersonalizing, removing family photos, personal collections, and excess furniture to help buyers envision themselves in the space. Deep clean every room including windows, floors, carpets, and appliances. Complete minor repairs such as fixing leaky faucets, patching wall holes, replacing broken tiles, updating outdated light fixtures, and repainting walls in neutral colors. Enhance curb appeal by maintaining the garden, cleaning the entrance, and ensuring the exterior looks inviting. For higher-end properties, consider hiring a professional staging company to furnish and style the space optimally. Well-staged properties typically sell faster and for 5-10% more than unstaged equivalents.',
                  cta: {
                    text: 'Help me find verified contractors',
                    type: 'lead_gen',
                    service: 'contractor_connection'
                  }
                },
                {
                  title: 'Valuation',
                  description: 'Obtain a professional property appraisal to determine an accurate and competitive asking price. Hire a certified appraiser who will assess your property\'s market value based on recent comparable sales, current condition, location attributes, size, features, and market trends. The appraisal provides an objective baseline for pricing negotiations and helps avoid overpricing (which leads to extended market time and eventual price reductions) or underpricing (leaving money on the table). Compare the appraisal with your real estate agent\'s comparative market analysis for a comprehensive view. Consider the fiscal value (valor patrimonial) as well, since it affects capital gains tax calculations. Proper valuation is critical for setting realistic expectations and achieving a timely sale at optimal value.',
                  cta: {
                    text: 'Help me find verified appraisers',
                    type: 'lead_gen',
                    service: 'appraiser_connection'
                  }
                },
                {
                  title: 'Seller Documentation',
                  description: 'Gather all necessary legal and financial documents that buyers and their lawyers will require during due diligence. Essential documents include the property title deed (escritura), land registry certificate (certidão permanente), energy performance certificate (certificado energético), habitation license (licença de habitação) if applicable, condominium rules and HOA financial statements if in a building, proof of paid IMI property taxes, paid utility bills, building insurance policy, proof of any recent renovations with permits, and mortgage settlement statement if applicable. Having complete documentation ready accelerates the sale process, builds buyer confidence, and prevents delays during closing. Missing or incomplete paperwork is a common cause of sale failures or renegotiations.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                },
                {
                  title: 'Agent Selection',
                  description: 'Interview and select a qualified real estate agent with proven experience selling properties in your neighborhood and price range. Evaluate candidates based on local market knowledge, recent sales track record, marketing strategy, commission rates (typically 5-6% in Portugal, often negotiable), communication style, and professional network. Ask for references from recent sellers and check online reviews. A good agent will provide a detailed comparative market analysis, recommend a realistic asking price, create a comprehensive marketing plan, handle all viewings and negotiations, coordinate with lawyers and other professionals, and guide you through the entire sale process. While selling independently (FSBO) saves commission, most sellers benefit from an agent\'s expertise, marketing reach, and negotiation skills, often achieving higher net proceeds despite the fee.',
                  cta: {
                    text: 'Help me find verified brokers',
                    type: 'lead_gen',
                    service: 'broker_connection'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'market',
          title: 'Market',
          description: 'List and promote the property',
          stages: [
            {
              type: 'sequential',
              label: 'Launch marketing campaign',
              activities: [
                {
                  title: 'Professional Photography',
                  description: 'Hire a professional real estate photographer to create high-quality visual content that showcases your property in the best light. Professional photos should capture every room from optimal angles with proper lighting, highlight key features and selling points, include exterior and neighborhood shots, and present the property as spacious and inviting. Consider adding a virtual tour or video walkthrough, which significantly increases online engagement and attracts more serious buyers. Drone photography can add dramatic aerial perspectives for properties with gardens, pools, or scenic views. High-quality visuals are the single most important marketing tool, as 90% of buyers start their search online and skip listings with poor photos. The investment in professional photography typically returns 5-10x through faster sales and higher offers.',
                  cta: {
                    text: 'Help me find verified photographers',
                    type: 'lead_gen',
                    service: 'photographer_connection'
                  }
                },
                {
                  title: 'Listing Creation',
                  description: 'Craft a compelling property listing that highlights key selling points and attracts qualified buyers. Write a detailed description emphasizing location benefits (proximity to transport, schools, amenities, beaches), property features (size, layout, recent renovations, outdoor spaces, parking), neighborhood character, and lifestyle advantages. Set a competitive asking price based on your appraisal and market analysis, positioned strategically to attract buyers while leaving room for negotiation. Include all essential details such as square meters, number of bedrooms and bathrooms, energy rating, IMI tax amount, and condominium fees if applicable. Optimize the listing for search by using relevant keywords. Your agent will typically handle listing creation, but review it carefully to ensure accuracy and compelling presentation.',
                  cta: {
                    text: 'Help me find verified brokers',
                    type: 'lead_gen',
                    service: 'broker_connection'
                  }
                },
                {
                  title: 'Multi-Channel Marketing',
                  description: 'Distribute your listing across multiple marketing channels to maximize exposure to potential buyers. List on major Portuguese property portals including Idealista, Imovirtual, Casa Sapo, and OLX. Consider international platforms like Rightmove, Kyero, or A Place in the Sun if targeting foreign buyers. Leverage social media through Facebook Marketplace, Instagram property accounts, and targeted ads to specific buyer demographics. Your agent should promote the property through their agency network, email database of registered buyers, and professional contacts. Create printed flyers for local distribution and window displays. The more channels you utilize, the faster you reach serious buyers. Track which channels generate the most inquiries to optimize your marketing spend.',
                  cta: {
                    text: 'Help me find verified brokers',
                    type: 'lead_gen',
                    service: 'broker_connection'
                  }
                }
              ]
            },
            {
              type: 'sequential',
              label: 'Engage with buyers',
              activities: [
                {
                  title: 'Open Houses & Viewings',
                  description: 'Schedule and conduct property viewings to allow serious buyers to experience the property firsthand. Prepare the property before each viewing by cleaning, ensuring good lighting, opening curtains, setting a comfortable temperature, and creating a welcoming atmosphere with subtle touches like fresh flowers or pleasant scents. Be flexible with viewing times to accommodate buyer schedules, including evenings and weekends. Your agent should conduct viewings professionally, highlighting key features, answering questions honestly, and providing information packets. Consider hosting an open house to generate urgency and competition among buyers. During viewings, give buyers space to explore while remaining available for questions. Collect feedback after each viewing to understand buyer perceptions and address any concerns.',
                  cta: {
                    text: 'Help me find verified brokers',
                    type: 'lead_gen',
                    service: 'broker_connection'
                  }
                },
                {
                  title: 'Feedback & Adjustments',
                  description: 'Continuously monitor market response and adjust your selling strategy based on buyer feedback and showing activity. Track metrics such as online listing views, inquiry volume, number of viewings, and any common objections or concerns raised by potential buyers. If showing activity is low after 2-3 weeks, consider improving photos, rewriting the description, or increasing marketing spend. If viewings are high but offers are not materializing, the asking price may be too high relative to condition or market comparables. Be prepared to make strategic price reductions if needed, as properties that linger on the market become stigmatized and harder to sell. Conversely, if you receive multiple early inquiries, you may have underpriced and could consider raising the price or waiting for better offers. Stay flexible and responsive to market signals.',
                  cta: {
                    text: 'Help me find verified brokers',
                    type: 'lead_gen',
                    service: 'broker_connection'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'negotiate',
          title: 'Negotiate',
          description: 'Accept offers and finalize terms',
          stages: [
            {
              type: 'sequential',
              label: 'Negotiate the sale',
              activities: [
                {
                  title: 'Offer Evaluation',
                  description: 'Carefully review and evaluate all offers received from potential buyers. Assess not only the offered price but also the buyer\'s financial qualification (pre-approved mortgage, proof of funds, employment status), proposed closing timeline, contingencies (financing, inspection, sale of current home), and any special conditions or requests. A higher offer with weak financing may be riskier than a slightly lower all-cash offer with no contingencies. Verify buyer seriousness by confirming they have viewed the property and their agent has done preliminary due diligence. Request proof of funds or mortgage pre-approval before engaging in serious negotiations. Your agent and lawyer can help assess offer strength and identify red flags. Don\'t accept the first offer automatically, especially if viewings have been strong, as better offers may be forthcoming.',
                  cta: {
                    text: 'Help me find verified brokers',
                    type: 'lead_gen',
                    service: 'broker_connection'
                  }
                },
                {
                  title: 'Price Negotiation',
                  description: 'Negotiate the final sale price with the buyer through a series of offers and counter-offers. Start from a position informed by your valuation, market comparables, and how long the property has been listed. If the initial offer is significantly below your asking price, make a counter-offer that moves toward a middle ground while defending your valuation with comparable sales data. Be prepared for multiple rounds of back-and-forth until you reach a mutually acceptable price. Consider the buyer\'s negotiation tactics and remain flexible but firm on your bottom line. Your agent should handle negotiations professionally, communicate your positions clearly, and advise on when to accept, counter, or walk away. Remember that every additional day on market costs you in holding expenses, so balance maximizing price with achieving a timely sale.',
                  cta: {
                    text: 'Help me find verified brokers',
                    type: 'lead_gen',
                    service: 'broker_connection'
                  }
                },
                {
                  title: 'Terms Negotiation',
                  description: 'Negotiate the non-price terms of the sale including closing timeline, deposit amount, contingencies, included furnishings or fixtures, and responsibility for any repairs identified during buyer due diligence. Agree on a closing date that allows sufficient time for buyer financing, legal due diligence, and document preparation, typically 30-60 days from offer acceptance. Negotiate what percentage of the purchase price will be paid as a deposit when signing the CPCV promissory contract (typically 10-30%). Decide whether to accept contingencies such as buyer financing approval or satisfactory property inspection, understanding each contingency gives the buyer an exit option. Determine what stays with the property (appliances, light fixtures, furniture) and what you remove. Address any repair requests from the buyer\'s inspection, either by completing repairs, offering a price reduction, or declining if unreasonable.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                },
                {
                  title: 'Accept Offer',
                  description: 'Once you\'ve agreed on price and terms, formalize the sale by signing the CPCV (Contrato de Promessa de Compra e Venda), the promissory purchase contract. This legally binding preliminary agreement commits both parties to complete the sale under the agreed terms. The buyer pays a deposit (typically 10-30% of purchase price) which is held in escrow. The CPCV specifies the final sale price, closing date, deposit amount, contingencies, and penalties for breach of contract by either party. Your lawyer should draft or review the CPCV to ensure it protects your interests, includes appropriate clauses, and complies with Portuguese law. Both parties sign in the presence of witnesses or lawyers. Keep your original signed copy safe. From this point forward, you\'re committed to selling unless the buyer fails to meet their obligations or agreed contingencies aren\'t satisfied.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                }
              ]
            }
          ]
        },
        {
          id: 'close-sale',
          title: 'Close Sale',
          description: 'Complete the transaction',
          stages: [
            {
              type: 'parallel',
              label: 'Pre-closing preparation',
              activities: [
                {
                  title: 'Final Property Inspection',
                  description: 'Allow the buyer to conduct a final walkthrough of the property shortly before the closing date (typically 24-48 hours before signing the deed). The buyer will verify that the property is in the agreed condition, any negotiated repairs have been completed, all included fixtures and appliances remain and are functional, and no new damage has occurred since their last viewing. Ensure the property is clean, empty (unless furnishings are included in the sale), and all your personal belongings are removed. Provide access to the buyer and their representative. This walkthrough confirms both parties are ready to proceed with the final ownership transfer. Address any last-minute issues immediately to avoid closing delays or disputes.',
                  cta: {
                    text: 'Help me find verified brokers',
                    type: 'lead_gen',
                    service: 'broker_connection'
                  }
                },
                {
                  title: 'Clear Liens & Charges',
                  description: 'Settle all outstanding debts and charges against the property before the closing date to ensure clean title transfer. If you have a mortgage, coordinate with your bank to obtain a settlement statement showing the exact payoff amount on closing day, and arrange for the mortgage to be fully discharged and the lien removed from the property registry. Pay any outstanding HOA fees, utility bills, property taxes, or other charges to avoid them being deducted from your sale proceeds or causing closing complications. Your lawyer will verify that all liens and encumbrances are cleared and obtain updated registry documents confirming clean title. The buyer\'s lawyer will also check this during their due diligence. Any unexpected liens discovered at closing can derail the sale or result in the funds being held in escrow until resolved.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                },
                {
                  title: 'Capital Gains Tax Calculation',
                  description: 'Calculate your capital gains tax liability on the property sale to understand your net proceeds and ensure funds are available to pay the tax. In Portugal, capital gains on property sales are taxed at 28% (for non-residents) or added to your income and taxed at progressive rates up to 48% (for residents), with 50% of gains exempt if you\'ve owned the property for over 24 months. Calculate gains as sale price minus original purchase price, minus acquisition costs (transfer taxes, legal fees), minus improvement costs (major renovations with receipts), minus sale costs (agent commission, legal fees). Additional exemptions may apply if you reinvest proceeds in another primary residence within certain timeframes. Consult a tax advisor to optimize your tax position and ensure accurate calculation. Set aside sufficient funds to pay the tax liability when filing your annual return, as the sale proceeds are paid to you gross without tax withholding.',
                  cta: {
                    text: 'Help me find verified tax advisors',
                    type: 'lead_gen',
                    service: 'tax_advisor_connection'
                  }
                }
              ]
            },
            {
              type: 'sequential',
              label: 'Complete the sale',
              activities: [
                {
                  title: 'Sign Deed (Escritura)',
                  description: 'Attend the notary office for the formal signing ceremony (escritura pública) where ownership officially transfers from seller to buyer. Both parties (or their legal representatives with power of attorney) must be present with valid identification. The notary will read through the final deed, verify identities, confirm the purchase price and payment arrangements, ensure all taxes and fees are paid or accounted for, and witness the signatures. At this moment, legal ownership transfers to the buyer. You will sign over the property title, and the buyer will pay the remaining balance (total purchase price minus the deposit already paid). The notary provides certified copies of the signed deed to both parties. Hand over all keys, access cards, remote controls, and relevant documentation (warranties, instruction manuals) to the buyer. Your lawyer should accompany you to ensure the process proceeds correctly and your interests are protected.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                },
                {
                  title: 'Receive Payment',
                  description: 'Receive the full sale proceeds at or immediately after the notary signing. The buyer typically pays via bank transfer or certified check for the remaining balance after the initial deposit. Verify the funds have cleared into your account before handing over keys and leaving the notary office (though in practice, the notary may hold keys until payment is confirmed). Your net proceeds equal the sale price minus agent commission (typically 5-6%), legal fees (typically 1-2%), any outstanding mortgage payoff, HOA fees or other charges, and notary fees. The capital gains tax is not deducted at closing, you pay it later when filing your tax return. Ensure you receive a detailed settlement statement showing all deductions. Keep all documentation for your tax records, including the signed deed, settlement statement, and proof of payment.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                },
                {
                  title: 'Deregister Property',
                  description: 'Complete all administrative tasks to formally deregister yourself as the property owner and close out related accounts. Cancel your property insurance policy effective from the closing date, providing proof of sale. Contact utility providers (electricity, water, gas, internet) to close accounts and arrange final meter readings and bills. Deregister from the municipal property tax (IMI) system by notifying the tax authority of the sale. If you were registered for rental income tax, inform the tax authority that you\'re no longer earning rental income from this property. Notify your bank of the sale if you had automatic payments set up for property-related expenses. Cancel any property management contracts if applicable. Close your Portuguese bank account if you no longer need it. Keep copies of all cancellation confirmations and final bills as proof you settled all obligations. Forward any mail or correspondence about the property to the new owner for at least 6-12 months to ensure nothing is missed.',
                  cta: {
                    text: 'Help me find verified lawyers',
                    type: 'lead_gen',
                    service: 'lawyer_connection'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  }

  const handlePhaseClick = (phase) => {
    if (activePhase === phase) {
      setActivePhase(null)
      setActiveSubStep(null)
    } else {
      setActivePhase(phase)
      setActiveSubStep(null)
    }
  }

  const handleSubStepClick = (subStepId) => {
    if (activeSubStep === subStepId) {
      setClosingSubStep(subStepId)
      setTimeout(() => {
        setActiveSubStep(null)
        setClosingSubStep(null)
      }, 400)
    } else {
      setClosingSubStep(null)
      setActiveSubStep(subStepId)
    }
  }

  const getAdvisorType = (ctaText) => {
    // Extract the advisor type from "Help me find verified X"
    return ctaText.replace('Help me find ', '')
  }

  const toggleActivityExpansion = (activityId) => {
    setExpandedActivities(prev => ({
      ...prev,
      [activityId]: !prev[activityId]
    }))
  }

  const splitDescription = (description) => {
    const sentences = description.split('. ')
    if (sentences.length <= 2) {
      return { summary: description, full: '' }
    }
    const summary = sentences.slice(0, 2).join('. ') + '.'
    const full = sentences.slice(2).join('. ')
    return { summary, full }
  }

  const getIcon = (iconName) => {
    const icons = {
      search: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      ),
      home: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      'trending-up': (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      )
    }
    return icons[iconName]
  }

  return (
    <div className="investment-details">
      {/* Navigation Header */}
      <div className="detail-nav">
        <button className="detail-back-btn" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to {neighborhoodName}
        </button>
        <div className="detail-logo">
          <h2>G6<span>Intelligence</span></h2>
        </div>
      </div>

      {/* Neighborhood Overview */}
      {neighborhood && (
        <div className="neighborhood-overview">
          <div className="overview-image">
            <img src={neighborhood.image} alt={neighborhoodName} />
            <div className="overview-image-overlay">
              <h3 className="overview-location">{neighborhoodName}</h3>
              <p className="overview-city">{cityName}</p>
            </div>
          </div>
          <div className="overview-metrics">
            <div className="overview-metric">
              <div className="overview-metric-label">Price per m²</div>
              <div className="overview-metric-value">
                €{neighborhood.metrics.pricePerSqm.EUR.min.toLocaleString()} - €{neighborhood.metrics.pricePerSqm.EUR.max.toLocaleString()}
              </div>
            </div>
            <div className="overview-metric">
              <div className="overview-metric-label">Rental Yield</div>
              <div className="overview-metric-value highlight">
                {neighborhood.metrics.rentalYield.min}% - {neighborhood.metrics.rentalYield.max}%
              </div>
            </div>
            <div className="overview-metric">
              <div className="overview-metric-label">Avg Holding Time</div>
              <div className="overview-metric-value">
                {neighborhood.metrics.avgHoldingTime} years
              </div>
            </div>
            <div className="overview-metric">
              <div className="overview-metric-label">Days to Rent</div>
              <div className="overview-metric-value">
                {neighborhood.metrics.daysToRent.avg} days
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="investment-hero">
        <div className="investment-hero-content">
          <h1 className="investment-title">Investment Roadmap</h1>
          <p className="investment-description">
            Your complete guide to acquiring, holding, and selling property abroad.
            Click each phase to explore the detailed steps and activities required for successful real estate investment.
          </p>
        </div>
      </div>

      {/* Main Roadmap - Horizontal Timeline */}
      <div className="roadmap-container">
        {/* Horizontal Phase Timeline */}
        <div className="horizontal-timeline">
          {Object.entries(roadmapData).map(([key, phase], index) => (
            <div key={key} className="timeline-phase-wrapper">
              <div
                className={`timeline-phase ${activePhase === key ? 'active' : ''}`}
                onClick={() => handlePhaseClick(key)}
                style={{ '--phase-color': phase.color }}
              >
                <div className="timeline-phase-icon">{getIcon(phase.icon)}</div>
                <h3 className="timeline-phase-title">{phase.title}</h3>
                <p className="timeline-phase-description">{phase.description}</p>
                <div className="timeline-phase-badge">
                  {phase.subSteps.length} steps
                </div>
              </div>

              {/* Connector Arrow */}
              {index < Object.keys(roadmapData).length - 1 && (
                <div className="timeline-arrow">
                  <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                    <path d="M0 12h55M48 5l7 7-7 7" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expanded Phase Roadmap - Vertical */}
        {activePhase && (
          <div className="phase-roadmap-expanded">
            {/* Mobile Close Button */}
            <button className="mobile-close-btn" onClick={() => setActivePhase(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            {/* Vertical Sub-steps Accordion */}
            <div className="substeps-vertical">
              {roadmapData[activePhase].subSteps.map((subStep, subIndex) => (
                <div key={subStep.id} className="substep-accordion-wrapper">
                  {/* Sub-step Accordion Header */}
                  <div
                    className={`substep-accordion-header ${activeSubStep === subStep.id ? 'active' : ''}`}
                    onClick={() => handleSubStepClick(subStep.id)}
                    style={{ '--phase-color': roadmapData[activePhase].color }}
                  >
                    <div className="substep-accordion-number">{subIndex + 1}</div>
                    <div className="substep-accordion-content">
                      <h4 className="substep-accordion-title">{subStep.title}</h4>
                      <p className="substep-accordion-description">{subStep.description}</p>
                    </div>
                    <div className="substep-accordion-badge">
                      {subStep.stages
                        ? subStep.stages.reduce((total, stage) => total + stage.activities.length, 0)
                        : (subStep.activities?.length || (subStep.activitiesParallel?.length + subStep.activitiesSequential?.length) || 0)
                      } activities
                    </div>
                    <div className="substep-accordion-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>

                  {/* Activities - Expanded when active */}
                  {(activeSubStep === subStep.id || closingSubStep === subStep.id) && (
                    <div className={`activities-accordion-content ${closingSubStep === subStep.id ? 'closing' : ''}`}>
                      {/* Handle multi-stage structure (Close phase) */}
                      {subStep.stages ? (
                        <>
                          {subStep.stages.map((stage, stageIndex) => (
                            <div key={stageIndex} style={{ '--stage-color': roadmapData[activePhase].color }}>
                              {/* Stage Label */}
                              <div className={`activities-section-label ${stage.type === 'sequential' ? 'sequential' : ''}`}>
                                {stage.label}
                              </div>

                              {/* Render activities based on type */}
                              {stage.type === 'parallel' ? (
                                <>
                                  <div className="activities-parallel-grid" style={{ gridTemplateColumns: `repeat(${stage.activities.length}, 1fr)` }}>
                                    {stage.activities.map((activity, actIndex) => (
                                      <div key={actIndex} className="activity-accordion-item parallel-grid">
                                        <div className="activity-accordion-bullet"></div>
                                        <div className="activity-accordion-details">
                                          <h5 className="activity-accordion-title">{activity.title}</h5>
                                          <div className="activity-accordion-description">
                                            {(() => {
                                              const { summary, full } = splitDescription(activity.description)
                                              const activityId = `${activePhase}-${subStep.id}-${stageIndex}-${actIndex}`
                                              const isExpanded = expandedActivities[activityId]

                                              return (
                                                <>
                                                  <p>{isExpanded ? activity.description : summary}</p>
                                                  {full && (
                                                    <button
                                                      className="show-more-button"
                                                      onClick={() => toggleActivityExpansion(activityId)}
                                                    >
                                                      {isExpanded ? 'Show less' : 'Show more'}
                                                    </button>
                                                  )}
                                                </>
                                              )
                                            })()}
                                          </div>
                                          {activity.duration && (
                                            <span className="activity-accordion-duration">{activity.duration}</span>
                                          )}
                                          {activity.cta && (
                                            <div className="activity-cta-wrapper">
                                              <span className="activity-cta-label">Help me find</span>
                                              <button
                                                className="activity-cta-button"
                                                onClick={() => {
                                                  setModalContext(activity.cta)
                                                  setShowConversionModal(true)
                                                }}
                                              >
                                                {getAdvisorType(activity.cta.text)}
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                  <line x1="5" y1="12" x2="19" y2="12"/>
                                                  <polyline points="12 5 19 12 12 19"/>
                                                </svg>
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Add convergence connector if not the last stage */}
                                  {stageIndex < subStep.stages.length - 1 && (
                                    <div className="activities-convergence">
                                      <div className="convergence-lines">
                                        <svg viewBox="0 0 200 60" className="convergence-svg">
                                          {stage.activities.length === 2 ? (
                                            <>
                                              <path d="M 50 0 L 50 30 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 150 0 L 150 30 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <circle cx="100" cy="50" r="4" className="convergence-circle"/>
                                            </>
                                          ) : stage.activities.length === 4 ? (
                                            <>
                                              <path d="M 25 0 L 25 25 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 60 0 L 60 35 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 140 0 L 140 35 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 175 0 L 175 25 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <circle cx="100" cy="50" r="4" className="convergence-circle"/>
                                            </>
                                          ) : stage.activities.length === 6 ? (
                                            <>
                                              <path d="M 16 0 L 16 20 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 50 0 L 50 30 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 75 0 L 75 38 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 125 0 L 125 38 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 150 0 L 150 30 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 184 0 L 184 20 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <circle cx="100" cy="50" r="4" className="convergence-circle"/>
                                            </>
                                          ) : (
                                            <>
                                              <path d="M 33 0 L 33 30 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 100 0 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <path d="M 167 0 L 167 30 L 100 50" className="convergence-path" strokeWidth="2" fill="none"/>
                                              <circle cx="100" cy="50" r="4" className="convergence-circle"/>
                                            </>
                                          )}
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                /* Sequential activities */
                                stage.activities.map((activity, actIndex) => (
                                  <div key={actIndex} className="activity-accordion-item sequential">
                                    <div className="activity-accordion-bullet"></div>
                                    <div className="activity-accordion-details">
                                      <h5 className="activity-accordion-title">{activity.title}</h5>
                                      <div className="activity-accordion-description">
                                        {(() => {
                                          const { summary, full } = splitDescription(activity.description)
                                          const activityId = `${activePhase}-${subStep.id}-${stageIndex}-seq-${actIndex}`
                                          const isExpanded = expandedActivities[activityId]

                                          return (
                                            <>
                                              <p>{isExpanded ? activity.description : summary}</p>
                                              {full && (
                                                <button
                                                  className="show-more-button"
                                                  onClick={() => toggleActivityExpansion(activityId)}
                                                >
                                                  {isExpanded ? 'Show less' : 'Show more'}
                                                </button>
                                              )}
                                            </>
                                          )
                                        })()}
                                      </div>
                                      {activity.duration && (
                                        <span className="activity-accordion-duration">{activity.duration}</span>
                                      )}
                                      {activity.cta && (
                                        <div className="activity-cta-wrapper">
                                          <span className="activity-cta-label">Help me find</span>
                                          <button
                                            className="activity-cta-button"
                                            onClick={() => {
                                              setModalContext(activity.cta)
                                              setShowConversionModal(true)
                                            }}
                                          >
                                            {getAdvisorType(activity.cta.text)}
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                              <line x1="5" y1="12" x2="19" y2="12"/>
                                              <polyline points="12 5 19 12 12 19"/>
                                            </svg>
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          ))}
                        </>
                      ) : subStep.activitiesParallel && subStep.activitiesSequential ? (
                        <div style={{ '--stage-color': roadmapData[activePhase].color }}>
                          {/* Label for parallel activities */}
                          <div className="activities-section-label">
                            These can be done simultaneously
                          </div>

                          {/* Parallel activities grid */}
                          <div className="activities-parallel-grid">
                            {subStep.activitiesParallel.map((activity, actIndex) => (
                              <div key={actIndex} className="activity-accordion-item parallel-grid">
                                <div className="activity-accordion-bullet"></div>
                                <div className="activity-accordion-details">
                                  <h5 className="activity-accordion-title">{activity.title}</h5>
                                  <div className="activity-accordion-description">
                                    {(() => {
                                      const { summary, full } = splitDescription(activity.description)
                                      const activityId = `${activePhase}-${subStep.id}-parallel-${actIndex}`
                                      const isExpanded = expandedActivities[activityId]

                                      return (
                                        <>
                                          <p>{isExpanded ? activity.description : summary}</p>
                                          {full && (
                                            <button
                                              className="show-more-button"
                                              onClick={() => toggleActivityExpansion(activityId)}
                                            >
                                              {isExpanded ? 'Show less' : 'Show more'}
                                            </button>
                                          )}
                                        </>
                                      )
                                    })()}
                                  </div>
                                  {activity.duration && (
                                    <span className="activity-accordion-duration">{activity.duration}</span>
                                  )}
                                  {activity.cta && (
                                    <div className="activity-cta-wrapper">
                                      <span className="activity-cta-label">Help me find</span>
                                      <button
                                        className="activity-cta-button"
                                        onClick={() => {
                                          setModalContext(activity.cta)
                                          setShowConversionModal(true)
                                        }}
                                      >
                                        {getAdvisorType(activity.cta.text)}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                          <line x1="5" y1="12" x2="19" y2="12"/>
                                          <polyline points="12 5 19 12 12 19"/>
                                        </svg>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Convergence connector */}
                          <div className="activities-convergence">
                            <div className="convergence-lines">
                              <svg viewBox="0 0 200 60" className="convergence-svg">
                                <path d="M 33 0 L 33 30 L 100 50" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="2" fill="none"/>
                                <path d="M 100 0 L 100 50" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="2" fill="none"/>
                                <path d="M 167 0 L 167 30 L 100 50" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="2" fill="none"/>
                                <circle cx="100" cy="50" r="4" fill="rgba(52, 211, 153, 0.7)"/>
                              </svg>
                            </div>
                          </div>

                          {/* Label for sequential activity */}
                          <div className="activities-section-label sequential">
                            After completing all above
                          </div>

                          {/* Sequential activities */}
                          {subStep.activitiesSequential.map((activity, actIndex) => (
                            <div key={actIndex} className="activity-accordion-item sequential">
                              <div className="activity-accordion-bullet"></div>
                              <div className="activity-accordion-details">
                                <h5 className="activity-accordion-title">{activity.title}</h5>
                                <div className="activity-accordion-description">
                                  {(() => {
                                    const { summary, full } = splitDescription(activity.description)
                                    const activityId = `${activePhase}-${subStep.id}-sequential-${actIndex}`
                                    const isExpanded = expandedActivities[activityId]

                                    return (
                                      <>
                                        <p>{isExpanded ? activity.description : summary}</p>
                                        {full && (
                                          <button
                                            className="show-more-button"
                                            onClick={() => toggleActivityExpansion(activityId)}
                                          >
                                            {isExpanded ? 'Show less' : 'Show more'}
                                          </button>
                                        )}
                                      </>
                                    )
                                  })()}
                                </div>
                                {activity.duration && (
                                  <span className="activity-accordion-duration">{activity.duration}</span>
                                )}
                                {activity.cta && (
                                  <div className="activity-cta-wrapper">
                                    <span className="activity-cta-label">Help me find</span>
                                    <button
                                      className="activity-cta-button"
                                      onClick={() => {
                                        setModalContext(activity.cta)
                                        setShowConversionModal(true)
                                      }}
                                    >
                                      {getAdvisorType(activity.cta.text)}
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                        <polyline points="12 5 19 12 12 19"/>
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Standard activities list for other phases */
                        <div style={{ '--stage-color': roadmapData[activePhase].color }}>
                          {/* Example: First activity with CTA (Sourcing phase) */}
                          {subIndex === 0 && subStep.activities && subStep.activities.length >= 1 && (
                            <div className="activity-accordion-item">
                              <div className="activity-accordion-bullet"></div>
                              <div className="activity-accordion-details">
                                <h5 className="activity-accordion-title">{subStep.activities[0].title}</h5>
                                <div className="activity-accordion-description">
                                  {(() => {
                                    const { summary, full } = splitDescription(subStep.activities[0].description)
                                    const activityId = `${activePhase}-${subStep.id}-activity-0`
                                    const isExpanded = expandedActivities[activityId]

                                    return (
                                      <>
                                        <p>{isExpanded ? subStep.activities[0].description : summary}</p>
                                        {full && (
                                          <button
                                            className="show-more-button"
                                            onClick={() => toggleActivityExpansion(activityId)}
                                          >
                                            {isExpanded ? 'Show less' : 'Show more'}
                                          </button>
                                        )}
                                      </>
                                    )
                                  })()}
                                </div>
                                {subStep.activities[0].duration && (
                                  <span className="activity-accordion-duration">{subStep.activities[0].duration}</span>
                                )}
                                {subStep.activities[0].cta && (
                                  <div className="activity-cta-wrapper">
                                    <span className="activity-cta-label">Help me find</span>
                                    <button
                                      className="activity-cta-button"
                                      onClick={() => {
                                        setModalContext(subStep.activities[0].cta)
                                        setShowConversionModal(true)
                                      }}
                                    >
                                      {getAdvisorType(subStep.activities[0].cta.text)}
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12"/>
                                        <polyline points="12 5 19 12 12 19"/>
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Remaining activities */}
                          {subStep.activities && subStep.activities.map((activity, actIndex) => {
                            // Skip first activity if already shown
                            if (subIndex === 0 && actIndex === 0) return null

                            return (
                              <div key={actIndex} className="activity-accordion-item">
                                <div className="activity-accordion-bullet"></div>
                                <div className="activity-accordion-details">
                                  <h5 className="activity-accordion-title">{activity.title}</h5>
                                  <div className="activity-accordion-description">
                                    {(() => {
                                      const { summary, full } = splitDescription(activity.description)
                                      const activityId = `${activePhase}-${subStep.id}-activity-${actIndex}`
                                      const isExpanded = expandedActivities[activityId]

                                      return (
                                        <>
                                          <p>{isExpanded ? activity.description : summary}</p>
                                          {full && (
                                            <button
                                              className="show-more-button"
                                              onClick={() => toggleActivityExpansion(activityId)}
                                            >
                                              {isExpanded ? 'Show less' : 'Show more'}
                                            </button>
                                          )}
                                        </>
                                      )
                                    })()}
                                  </div>
                                  {activity.duration && (
                                    <span className="activity-accordion-duration">{activity.duration}</span>
                                  )}
                                  {activity.cta && (
                                    <div className="activity-cta-wrapper">
                                      <span className="activity-cta-label">Help me find</span>
                                      <button
                                        className="activity-cta-button"
                                        onClick={() => {
                                          setModalContext(activity.cta)
                                          setShowConversionModal(true)
                                        }}
                                      >
                                        {getAdvisorType(activity.cta.text)}
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                          <line x1="5" y1="12" x2="19" y2="12"/>
                                          <polyline points="12 5 19 12 12 19"/>
                                        </svg>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Vertical Connector Line */}
                  {subIndex < roadmapData[activePhase].subSteps.length - 1 && (
                    <div className="substep-vertical-connector" style={{ '--phase-color': roadmapData[activePhase].color }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary CTA */}
      <div className="roadmap-footer">
        <div className="footer-content">
          <h3>Questions about the investment process?</h3>
          <p>
            Our team can guide you through each step<br />
            and help you navigate the complexities of investing abroad.
          </p>
        </div>
        <button className="footer-cta">
          Schedule a Consultation
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>

      {/* Conversion Modal */}
      <ConversionModal
        isOpen={showConversionModal}
        onClose={() => setShowConversionModal(false)}
        context={modalContext}
      />
    </div>
  )
}
