import { TestBed } from '@angular/core/testing'

import { ApiMapService } from './api-map.service'
import { ApiPathService } from './api-path.service'

describe('ApiPathService', () => {
  let apiPathService: ApiPathService
  let apiMapService: jasmine.SpyObj<ApiMapService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiMapService', ['getValue'])

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [ApiPathService, { provide: ApiMapService, useValue: spy }],
    })

    apiPathService = TestBed.inject(ApiPathService)
    apiMapService = TestBed.inject(
      ApiMapService
    ) as jasmine.SpyObj<ApiMapService>
  })

  describe('isValid', () => {
    it('should return true for endpoint', () => {
      expect(apiPathService.isValid('endpoint')).toBe(true)
    })

    it('should return true for endpoint with delimiter', () => {
      expect(apiPathService.isValid('endpoint:')).toBe(true)
    })

    it('should return true for valid prop', () => {
      expect(apiPathService.isValid('endpoint:propA.propB')).toBe(true)
    })

    it('should return true for valid prop with delimiter', () => {
      expect(apiPathService.isValid('endpoint:propA.propB.')).toBe(true)
    })

    it('should return false for whitespaces', () => {
      expect(apiPathService.isValid('endpoint: propA')).toBe(false)
    })

    it('should return false for special characters', () => {
      expect(apiPathService.isValid('endpoint:!propA')).toBe(false)
    })
  })

  describe('isExisting', () => {
    beforeEach(() => {
      apiMapService.getValue.and.returnValue({
        endpoint: {
          children: {
            propA: {
              type: 'integer',
              description: 'description',
              children: undefined,
            },
          },
        },
      })
    })

    it('should return true for existing endpoint', () => {
      expect(apiPathService.isExisting('.endpoint')).toBe(true)
    })

    it('should return true for existing endpoint with prop', () => {
      expect(apiPathService.isExisting('.endpoint.propA')).toBe(true)
    })

    it('should return false for non-existing endpoint', () => {
      expect(apiPathService.isExisting('.other-endpoint')).toBe(false)
    })

    it('should return false for existing endpoint with non-existing prop', () => {
      expect(apiPathService.isExisting('.endpoint:other-prop')).toBe(false)
    })
  })
})
